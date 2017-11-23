package org.itextpdfservice;

import com.itextpdf.text.pdf.*;
import java.io.*;
import java.net.URLDecoder;
import com.google.gson.*;
import org.apache.commons.codec.binary.*;
import org.apache.logging.log4j.*;

public class Controller {
  private static final Logger logger = LogManager.getLogger(Controller.class);

  public static String update(String fields) {
    try {
      fields = URLDecoder.decode(fields, "UTF-8").replace("=", "");

      Reader jsonReader = new StringReader(fields);
      Gson gson = new GsonBuilder().create();
      Fields f = gson.fromJson(jsonReader, Fields.class);

      if (f.file == null || !(new File(".." + f.file)).exists()) {
        return "";
      }

      ByteArrayOutputStream w = new ByteArrayOutputStream();

      PdfStamper s = new PdfStamper(new PdfReader(".." + f.file), w);

      AcroFields a = s.getAcroFields();

      if (f.entries != null) {
        for (int i = 0; i < f.entries.length; i++) {
          FieldEntry e = f.entries[i];

          if (e.operation.equals("d")) {
            a.removeField(e.name);
          }

          if (e.operation.equals("s")) {
            a.setField(e.name, e.value, true);
          }
        }
      }

      if (f.operation != null && f.operation.equals("f")) {
        s.setFormFlattening(true);
        s.setFreeTextFlattening(true);
        s.setAnnotationFlattening(true);

        for (int p = 1; p <= s.getReader().getNumberOfPages(); p++) {
          PdfDictionary pageDict = s.getReader().getPageN(p);
          PdfArray annots = pageDict.getAsArray(PdfName.ANNOTS);
          PdfArray newAnnots = new PdfArray();
          if (annots != null) {
            for (int i = 0; i < annots.size(); ++i) {
              PdfDictionary annotDict = annots.getAsDict(i);
              if (!PdfName.LINK.equals(annotDict.getAsName(PdfName.SUBTYPE))) {
                // annots are actually listed as PdfIndirectReference's.  
                // Adding the dict directly would be A Bad Thing.
                newAnnots.add(annots.getPdfObject(i));// get the original reference, not the dict
              }
            }

            pageDict.put(PdfName.ANNOTS, newAnnots);
          }
        }
      }

      s.close();
      w.close();

      logger.debug("Generate the form [" +  f.file + "]");

      return new String(Base64.encodeBase64(w.toByteArray()));
    } catch (Exception ex) {
      logger.error(ex);
    }

    return "";
  }
}