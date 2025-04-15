/*
  Copyright © 2018 ASCON-Design Systems LLC. All rights reserved.
  This sample is licensed under the MIT License.
*/
using System;
using System.Collections.Generic;
using System.Security;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using Ascon.Pilot.DataClasses;
using Ascon.Pilot.Server.Api;

namespace ChangesListener.Api
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                // Создаем SecureString из пароля
                var secureString = new SecureString();
                foreach (var c in request.Password.ToCharArray())
                    secureString.AppendChar(c);

                // Подключение к серверу
                var credentials = ConnectionCredentials.GetConnectionCredentials(
                    request.Server ?? "localhost:5545", 
                    request.Username, 
                    secureString);

                var client = new HttpPilotClient(credentials.GetConnectionString(), credentials.GetConnectionProxy());
                client.Connect(false);

                // Попытка аутентификации
                var authApi = client.GetAuthenticationApi();
                authApi.Login(credentials.DatabaseName,
                    credentials.Username,
                    credentials.ProtectedPassword,
                    false,
                    90);

                // Если дошли до этой точки, значит аутентификация прошла успешно
                return Ok(new
                {
                    Success = true,
                    Message = "Авторизация успешна",
                    User = new
                    {
                        Username = request.Username,
                        Server = request.Server
                    }
                });
            }
            catch (Exception ex)
            {
                // Ошибка аутентификации или подключения
                return Content(HttpStatusCode.Unauthorized, new
                {
                    Success = false,
                    Message = $"Ошибка авторизации: {ex.Message}"
                });
            }
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Server { get; set; }
    }
} 