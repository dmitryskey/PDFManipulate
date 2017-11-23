package org.itextpdfservice;

import java.io.*;
import java.net.*;
import org.apache.logging.log4j.*;

public class Application
{
    private static final Logger logger = LogManager.getLogger(Application.class);

    public static void main(String[] args) {
        ServerSocket serverSocket = null;

        try {
            serverSocket = new ServerSocket(8086); 
            while(true) {    
                Socket server = serverSocket.accept();
    
                PrintWriter toClient = new PrintWriter(server.getOutputStream(),true);
                BufferedReader fromClient = new BufferedReader(new InputStreamReader(server.getInputStream()));
                String fields = fromClient.readLine();
                toClient.println(Controller.update(fields));
            }
        }
        catch(UnknownHostException ex) {
            logger.error(ex);
        }
        catch(IOException e){
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
