package org.itextpdfservice;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.text.*;

public class Application
{
    private static SimpleDateFormat timeStamper = new SimpleDateFormat("yyyyMMddHHmmss");

    private static String getCurrentTimeStamp() {
        return timeStamper.format(new java.util.Date());
    }

    public static void main(String[] args) {
        ServerSocket serverSocket = null;

        PrintWriter writer = null;

        try {
            writer = new PrintWriter(getCurrentTimeStamp() + ".log", "UTF-8");

            File folder = new File("../db");
            File[] listOfFiles = folder.listFiles();

            if (listOfFiles.length == 0) {
                if (writer != null) {
                    writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	Database is found");
                    writer.flush();
                }

                return;
            }

            Connection conn = DriverManager.getConnection("jdbc:sqlite:../db/" + listOfFiles[0]);

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT Parameter FROM App_Config WHERE Name = 'iTextPort'");

            int servicePort = 8086; // default port

            while (rs.next()) {
                servicePort = rs.getInt("Parameter");
            }

            conn.close();

            serverSocket = new ServerSocket(servicePort); 
            while (true) {
                Socket server = serverSocket.accept();

                PrintWriter toClient = new PrintWriter(server.getOutputStream(),true);
                BufferedReader fromClient = new BufferedReader(new InputStreamReader(server.getInputStream()));
                String fields = fromClient.readLine();
                toClient.println(Controller.update(fields, writer));
            }
        }
        catch (UnknownHostException e) {
            if (writer != null) {
                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);

                writer.flush();
            }
        }
        catch (IOException e) {
            if (writer != null) {
                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);
                writer.flush();
            }
        }
        catch (SQLException e) {
            if (writer != null) {
                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);
                writer.flush();
            }
        }
        finally
        {
            if (serverSocket != null && !serverSocket.isClosed()) {
                try{
                    serverSocket.close();
                }
                catch(IOException e) {
                    if (writer != null) {
	                writer.println("[ERROR]	[" + getCurrentTimeStamp() + "]	" + e);
                        writer.flush();
                    }
                }
            }
        }
    }
}
