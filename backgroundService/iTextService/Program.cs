﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Data.SQLite;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using log4net.Config;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using log4net;

namespace iTextService
{
    public class Program
    {
        private static string GetiTextServicePort(string[] args)
        {
            int port = 0;
            if (args.Count() > 0 && File.Exists(args[0]))
            {
                 var db_conn = new SQLiteConnection($"Data Source={args[0]}");
                 db_conn.Open();
                 var db_cmd = new SQLiteCommand("SELECT Parameter FROM App_Config WHERE Name = 'iTextPort'", db_conn);
                 
                 int.TryParse(db_cmd.ExecuteScalar() as string, out port);
                 db_conn.Close();               
            }

            return port > 0 ? ":" + port.ToString() : string.Empty; 
        }

        public static void Main(string[] args)
        {
            var entry = Assembly.GetEntryAssembly();
            log4net.GlobalContext.Properties["LogFileName"] =
                Directory.GetParent(Path.GetDirectoryName(entry.Location)).FullName;
            XmlConfigurator.Configure(
                log4net.LogManager.GetRepository(entry),
                new FileInfo(Path.Combine(Path.GetDirectoryName(entry.Location), "log4net.config")));

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) => 
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls($"http://*{GetiTextServicePort(args)}");
    }
}
