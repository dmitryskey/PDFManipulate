package com.itextpdfservice;

import com.itextpdf.text.pdf.*;
import java.io.*;
import java.net.URLDecoder;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Controller {

  public static String updatePdf(String fields) {
    try {
      URLDecoder decoder = new URLDecoder();
      fields = decoder.decode(fields, "UTF-8").replace("=", "");

      Reader jsonReader = new StringReader(fields);
      Gson gson = new GsonBuilder().create();
      Fields f = gson.fromJson(jsonReader, Fields.class);

      FileOutputStream w = new FileOutputStream("../data/" + f.uuid + "_1");

      PdfStamper s = new PdfStamper(new PdfReader("../data/" + f.uuid), w);

      AcroFields a = s.getAcroFields();

      for (int i = 0; i < f.entries.length; i++) {
        FieldEntry e = f.entries[i];

        if (e.operation.equals("d")) {
          a.removeField(e.name);
        }

        if (e.operation.equals("s") || e.operation.equals("f")) {
          a.setField(e.name, e.value);
        }

        if (e.operation == "f") {
          s.partialFormFlattening(e.name);
        }
      }

      s.close();
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    return fields;
  }
}