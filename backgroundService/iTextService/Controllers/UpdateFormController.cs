using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iText.Forms;
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
                    return Ok(string.Empty);
                }

                if (string.IsNullOrEmpty(fields.file))
                {
                    log.Error("File name does not exist");
                    return Ok(string.Empty);
                }

                if (!System.IO.File.Exists(fields.file))
                {
                    log.Error($"File {fields.file} is not found");
                    return Ok(string.Empty);
                }
    
                var ms = new MemoryStream();
                var r = new PdfReader(fields.file);
                var d = new PdfDocument(r, new PdfWriter(ms));
                var a = PdfAcroForm.GetAcroForm(d, true);
                if (fields.entries != null)
                {
                    // delete field by its name
                    fields.entries
                        .FindAll(e => string.Compare(e.operation, "d", true) == 0 && a.GetField(e.name) != null)
                        .ForEach(e => a.RemoveField(e.name));

                    // set field value
                    fields.entries
                        .FindAll(e => string.Compare(e.operation, "s", true) == 0 && a.GetField(e.name) != null)
                        .ForEach(e => a.GetField(e.name).SetValue(e.value));
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
                var result = Ok(ms.ToArray());
                result.ContentTypes.Add( "application/pdf");
                return Ok(ms.ToArray());
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
}
