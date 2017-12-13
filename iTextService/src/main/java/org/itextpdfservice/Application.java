package org.itextpdfservice;

import java.io.*;
import java.net.*;
import java.sql.*;
import org.apache.logging.log4j.*;
import org.apache.log4j.PropertyConfigurator;

public class Application
{
    private static final Logger logger = LogManager.getLogger(Application.class);

    public static void main(String[] args) {
        ServerSocket serverSocket = null;

        PropertyConfigurator.configure("src/main/resources/log4j.properties");

        try {
            File folder = new File("../db");
            File[] listOfFiles = folder.listFiles();

            if (listOfFiles.length == 0) {
                logger.error("Database is found");
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
            while(true) {
                Socket server = serverSocket.accept();

                PrintWriter toClient = new PrintWriter(server.getOutputStream(),true);
                BufferedReader fromClient = new BufferedReader(new InputStreamReader(server.getInputStream()));
                String fields = fromClient.readLine();
                toClient.println(Controller.update(fields));
            }
        }
        catch (UnknownHostException e) {
            logger.error(e);
        }
        catch (IOException e) {
            logger.error(e);
        }
        catch (SQLException e) {
            logger.error(e);
        }
        finally
        {
            if (serverSocket != null && !serverSocket.isClosed()) {
                try{
                    serverSocket.close();
                }
                catch(IOException e){
                    logger.error(e);
                }
            }
        }
    }
}
