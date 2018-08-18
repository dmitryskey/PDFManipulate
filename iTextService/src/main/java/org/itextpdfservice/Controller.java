package org.itextpdfservice;

import com.itextpdf.text.pdf.*;
import java.io.*;
import java.net.URLDecoder;
import java.text.*;
import com.google.gson.*;
import org.apache.commons.codec.binary.*;

public class Controller {
    private static SimpleDateFormat timeStamper = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

    private static String getCurrentTimeStamp() {
        return timeStamper.format(new java.util.Date());
    }

    public static String processRequest(String fields, PrintWriter writer) {
        try {
            fields = URLDecoder.decode(fields, "UTF-8").replace("=", "");

            Reader jsonReader = new StringReader(fields);
            Gson gson = new GsonBuilder().create();

            Fields f = gson.fromJson(jsonReader, Fields.class);

            return flattenDocument(f, writer);
        }
        catch (Exception e) {
            if (writer != null) {
                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);
                writer.flush();
            }
        }

        return "";
    }

    private static String flattenDocument(Fields f, PrintWriter writer) {
        try {
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
                                // Annots are actually listed as PdfIndirectReference's.  
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

            if (writer != null) {
                writer.println("[INFO]	[" + getCurrentTimeStamp() + "]	Generate the form [" +  f.file + "]");
                writer.flush();
            }

            return new String(Base64.encodeBase64(w.toByteArray()));
        }
        catch (Exception e) {
            if (writer != null) {
                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);
                writer.flush();
            }
        }

        return "";
    }
}