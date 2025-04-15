/*
  Copyright © 2018 ASCON-Design Systems LLC. All rights reserved.
  This sample is licensed under the MIT License.
*/
using System;
using System.Collections.Generic;
using System.Security;
using Ascon.Pilot.DataClasses;
using Ascon.Pilot.Server.Api;

namespace ChangesListener
{
    class Program
    {
        static void Main(string[] args)
        {
            System.AppDomain.CurrentDomain.UnhandledException += UnhandledExceptionTrapper;
            var server = args[0];
            var login = args[1];
            var password = args[2];
            var secureString = new SecureString();

            foreach (var c in password.ToCharArray())
                secureString.AppendChar(c);

            var credentials = ConnectionCredentials.GetConnectionCredentials(server, login, secureString);
            var client = new Client();
            var rules = new List<DRule>(); // Пустой список правил, так как они не используются

            client.StartListen(credentials, rules);

            Console.ReadLine();
        }

        static void UnhandledExceptionTrapper(object sender, UnhandledExceptionEventArgs e)
        {
            Console.WriteLine(e.ExceptionObject.ToString());
            Console.WriteLine("Press any key to continue");
            Console.ReadLine();
            Environment.Exit(1);
        }
    }
}
