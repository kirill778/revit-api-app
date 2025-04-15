/*
  Copyright © 2018 ASCON-Design Systems LLC. All rights reserved.
  This sample is licensed under the MIT License.
*/
using System;
using System.Collections.Generic;
using System.Security;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Hosting;
using Owin;
using Ascon.Pilot.DataClasses;
using Ascon.Pilot.Server.Api;

namespace ChangesListener
{
    class Program
    {
        static void Main(string[] args)
        {
            System.AppDomain.CurrentDomain.UnhandledException += UnhandledExceptionTrapper;

            // Настройка базового URL
            string baseAddress = "http://localhost:5000/";
            
            // Запускаем веб-сервер OWIN
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine($"API сервер запущен по адресу {baseAddress}");
                Console.WriteLine("Нажмите Enter для выхода");
                Console.ReadLine();
            }
        }

        static void UnhandledExceptionTrapper(object sender, UnhandledExceptionEventArgs e)
        {
            Console.WriteLine(e.ExceptionObject.ToString());
            Console.WriteLine("Press any key to continue");
            Console.ReadLine();
            Environment.Exit(1);
        }
    }

    // Класс конфигурации OWIN
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Настройка WebAPI
            HttpConfiguration config = new HttpConfiguration();
            
            // Настройка маршрутов
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            
            // Включение CORS
            var corsAttr = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttr);
            
            // Использование WebAPI в приложении OWIN
            app.UseWebApi(config);
            
            Console.WriteLine("API маршруты настроены");
        }
    }
}
