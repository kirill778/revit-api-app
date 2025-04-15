'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; server: string } | null>(null);
  
  useEffect(() => {
    // При входе на страницу показываем уведомление о успешном входе
    toast.success('Добро пожаловать в личный кабинет!', {
      duration: 4000,
    });
    
    // Получаем данные пользователя из localStorage или от сервера
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Если нет данных, перенаправляем на страницу авторизации
        router.push('/');
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  }, [router]);

  const handleLogout = () => {
    // Очищаем данные сессии
    localStorage.removeItem('userData');
    toast.success('Вы успешно вышли из системы');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Подключение к Pilot-Server</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Выйти
          </button>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Информация о подключении</h2>
          <p className="text-gray-700"><strong>Пользователь:</strong> {user.username}</p>
          <p className="text-gray-700"><strong>Сервер:</strong> {user.server}</p>
          <p className="text-gray-700"><strong>Статус:</strong> <span className="text-green-500">Подключено</span></p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Уведомления</h2>
          <p className="text-green-600">Соединение с сервером успешно установлено</p>
        </div>
      </div>
    </div>
  );
} 