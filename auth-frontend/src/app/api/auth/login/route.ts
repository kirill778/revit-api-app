import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, server = 'localhost:5545' } = body;

    // Здесь делаем запрос к C# API
    // Обратите внимание на порт 5000, где работает OWIN-сервер
    try {
      // Вызов C# API
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        username,
        password,
        server
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Предполагается, что C# API вернет структуру { success: true, user: { username, server } }
      const userData = {
        username,
        server
      };

      return NextResponse.json({
        success: true,
        message: 'Авторизация успешна',
        user: userData,
        // Возвращаем локальную копию данных для сохранения в localStorage
        userData: JSON.stringify(userData)
      });
    } catch (error: any) {
      // Обработка ошибок от C# API
      return NextResponse.json({
        success: false,
        message: error.response?.data?.message || 'Неверное имя пользователя или пароль'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Ошибка при обработке запроса на авторизацию:', error);
    return NextResponse.json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    }, { status: 500 });
  }
} 