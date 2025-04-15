# Pilot Authentication Client

Простой клиент для проверки авторизации в системе Ascon Pilot.

## Описание

Это консольное приложение предназначено для проверки подключения и авторизации пользователя в системе Ascon Pilot. После успешной авторизации приложение выводит сообщение "Успешный вход".

## Использование

```
ChangesListener.exe <server_address> <username> <password>
```

Например:
```
ChangesListener.exe https://example.com:45661/pilot-db username password
```

## Параметры
- `server_address` - адрес сервера Pilot
- `username` - имя пользователя
- `password` - пароль пользователя

## Требования
- .NET Framework 4.7.2
- Ascon.Pilot.Server.Api 