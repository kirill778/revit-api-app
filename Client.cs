/*
  Copyright © 2018 ASCON-Design Systems LLC. All rights reserved.
  This sample is licensed under the MIT License.
*/
using System;
using System.Collections.Generic;
using System.Linq;
using Ascon.Pilot.DataClasses;
using Ascon.Pilot.Server.Api;
using Ascon.Pilot.Server.Api.Contracts;

namespace ChangesListener
{
    class Client : IConnectionLostListener
    {
        private HttpPilotClient _client;
        private ConnectionCredentials _credentials;

        public void StartListen(ConnectionCredentials credentials, List<DRule> rules)
        {
            _client?.Dispose();

            _credentials = credentials;
            _client = new HttpPilotClient(_credentials.GetConnectionString(), _credentials.GetConnectionProxy());
            _client.SetConnectionLostListener(this);
            _client.Connect(false);
            Console.WriteLine("Connected to database " + credentials.DatabaseName);

            _client.GetAuthenticationApi().Login(_credentials.DatabaseName,
                _credentials.Username,
                _credentials.ProtectedPassword,
                false,
                90);

            Console.WriteLine(_credentials.Username + " authenticated");
            Console.WriteLine("Успешный вход");
        }

        public void ConnectionLost(Exception ex = null)
        {
            Console.WriteLine("Connection lost");
            Console.WriteLine(ex);
        }
    }
}
