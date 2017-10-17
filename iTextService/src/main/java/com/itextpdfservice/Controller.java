package com.itextpdfservice;

import com.itextpdf.text.pdf.*;
import java.io.*;
import java.net.URLDecoder;
import java.util.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Controller {

  public static String update(String fields) {
    try {
      URLDecoder decoder = new URLDecoder();
      fields = decoder.decode(fields, "UTF-8").replace("=", "");

      Reader jsonReader = new StringReader(fields);
      Gson gson = new GsonBuilder().create();
      Fields f = gson.fromJson(jsonReader, Fields.class);

      ByteArrayOutputStream w = new ByteArrayOutputStream();

      PdfStamper s = new PdfStamper(new PdfReader(".." + f.file), w);

      AcroFields a = s.getAcroFields();

      for (int i = 0; i < f.entries.length; i++) {
        FieldEntry e = f.entries[i];

        if (e.operation.equals("d")) {
          a.removeField(e.name);
        }

        if (e.operation.equals("s")) {
          a.setField(e.name, e.value);
        }
      }

      if (f.operation.equals("f")) {
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

      return new String(Base64.getEncoder().encode(w.toByteArray()));
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    return null;
  }
}