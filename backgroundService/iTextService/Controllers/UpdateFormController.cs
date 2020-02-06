using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using iText.Forms;
using iText.Forms.Fields;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using log4net;
using Microsoft.AspNetCore.Mvc;

namespace iTextService.Controllers
{
    [Route("api/UpdateForm")]
    [ApiController]
    public class UpdateFormController : ControllerBase
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(UpdateFormController));

        [HttpPost]
        public IActionResult Post([FromBody] Fields fields)
        {
            try
            {
                if (fields == null)
                {
                    log.Error("Empty JSON object");
                    return BadRequest();
                }

                if (string.IsNullOrEmpty(fields.file))
                {
                    log.Error("File name does not exist");
                    return BadRequest();
                }

                if (!System.IO.File.Exists(fields.file))
                {
                    log.Error($"File {fields.file} is not found");
                    return BadRequest();
                }

                using (var ms = new MemoryStream())
                {
                    var r = new PdfReader(fields.file);
                    var d = new PdfDocument(r, new PdfWriter(ms));
                    var a = PdfAcroForm.GetAcroForm(d, true);

                    if (fields.entries != null)
                    {
                        // delete field by its name
                        fields.entries
                        .FindAll(e => string.Compare(e.operation, "d", true) == 0 && a.GetField(e.name) != null)
                        .ForEach(e => a.RemoveField(e.name));

                        // purge all fields that are not in the list
                        a.GetFormFields().Where(p => !fields.entries.Exists(f => f.name == p.Key))
                        .ToList().ForEach(p => a.RemoveField(p.Key));

                        // set field value
                        fields.entries
                        .FindAll(e => string.Compare(e.operation, "s", true) == 0 && a.GetField(e.name) != null)
                        .ForEach(e =>
                        {
                            var f = a.GetField(e.name);

                            if (f is PdfButtonFormField)
                            {
                                // iText 7 always returns "3", we have to parse the appereance and set the correct value
                                f.SetCheckType(f.GetCheckType());
                                f.RegenerateField();
                            }

                            var borderColor = f.GetBorderColor();
                            if (borderColor == null)
                            {
                                f.SetBorderWidth(0);
                            }
                            else
                            {
                                // workaround for the iText 7 issue, it ignores the border color and
                                // we have to parse the appereance and set the correct value
                                f.SetBorderColor(borderColor);
                            }

                            if (f is PdfChoiceFormField)
                            {
                                // workaround for the iText 7 issue when it draws the blue background
                                var c = f as PdfChoiceFormField;

                                if (c.GetOptions().Count() > 0)
                                {
                                    c.SetListSelected(new int[] {1});
                                }
                            }

                            f.SetValue(e.value);
                        });
                    }

                    if (string.Compare(fields.operation, "f", true) == 0)
                    {
                        for (int p = 1; p <= d.GetNumberOfPages(); p++)
                        {
                            var pageDict = d.GetPage(p);
                            var annots = pageDict.GetAnnotations();

                            if (annots != null)
                            {
                                var newAnnots = new PdfArray();

                                // Copy all non-links annotations
                                annots.Where(annot => 
                                    annot.GetAppearanceDictionary() != null && 
                                    annot.GetAppearanceDictionary().GetAsName(PdfName.Subtype) != PdfName.Link &&
                                    annot.GetPdfObject() != null).ToList()
                                .ForEach(annot => newAnnots.Add(annot.GetPdfObject()));

                                // replace annotations with non-link ones (i.e. effectively remove links)
                                pageDict.Put(PdfName.Annots, newAnnots);
                            }
                        }

                        a.FlattenFields();
                    }

                    d.Close();
                    r.Close();

                    log.Info($"The form [{fields.file}] is generated");
                    return File(ms.ToArray(), "application/pdf");
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
                return Ok(string.Empty);
            }
        }

        public class Fields
        {
            public class FieldEntry
            {
                public string name { get; set; }
                public string value { get; set; }
                public string operation { get; set; }
            }

            public string file { get; set; }
            public string operation { get; set; }
            public List<FieldEntry> entries { get; set; }
        }
    }
    public static class PdfFormFieldExtensions
    {
        public static Color GetBorderColor(this PdfFormField f)
        {
            var borderColorProperty = typeof(PdfFormField).GetField("borderColor", BindingFlags.NonPublic | BindingFlags.Instance);
            if (borderColorProperty != null)
            {
                if (borderColorProperty.GetValue(f) != null)
                {
                    return borderColorProperty.GetValue(f) as Color;
                }

                var pdfObject = f.GetPdfObject();
                if (pdfObject != null)
                {
                    const string RED = "RED", GREEN = "GREEN", BLUE = "BLUE";
                    var regex = new Regex(
                        $@"/BC\s\[(?<{RED}>\d+\.*\d+?)\s(?<{GREEN}>\d+\.*\d+?)\s(?<{BLUE}>\d+\.*\d+?)\s\]");
                    var matches = regex.Match(pdfObject.ToString());

                    if (matches != null)
                    {
                        var red = matches.Groups[RED];
                        var green = matches.Groups[GREEN];
                        var blue = matches.Groups[BLUE];

                        float redColor, greenColor, blueColor;
                        if (float.TryParse(red.Value, out redColor) &&
                            float.TryParse(green.Value, out greenColor) &&
                            float.TryParse(blue.Value, out blueColor))
                        {
                            var color = ColorConstants.WHITE;
                            color.SetColorValue(new float[]{redColor, greenColor, blueColor});
                            return color;
                        }
                    }
                }
            }

            return null;
        }

        public static int GetCheckType(this PdfFormField f)
        {
            var pdfObject = f.GetPdfObject();
            if (pdfObject != null)
            {
                const string TYPE = "TYPE";
                var regex = new Regex($@"/CA\s(?<{TYPE}>[0-9a-zA-Z]+?)");

                var matches = regex.Match(pdfObject.ToString());

                if (matches != null)
                {
                    var type = matches.Groups[TYPE];
                    switch (type.Value)
                    {
                        // Check
                        case "4":
                            return 1;
                        // Circle
                        case "l":
                            return 2;
                        // Cross
                        case "8":
                            return 3;
                        // Diamond
                        case "u":
                            return 4;
                        // Square
                        case "n":
                            return 5;
                        // Star
                        case "H":
                            return 6;
                        default:
                            return 3;
                    }
                }
            }

            return 3;
        }
    }
}
