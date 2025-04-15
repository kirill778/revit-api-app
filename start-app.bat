@echo off
echo Запуск приложения авторизации Pilot-Server

echo Запуск C# API сервера...
start cmd /k "cd /d %~dp0 && ChangesListener.exe"

echo Запуск Next.js фронтенда...
start cmd /k "cd /d %~dp0\auth-frontend && npm run dev"

echo Сервисы запущены!
echo API-сервер: http://localhost:5000
echo Фронтенд: http://localhost:3000

echo Нажмите любую клавишу, чтобы открыть приложение в браузере...
pause >nul
start http://localhost:3000 