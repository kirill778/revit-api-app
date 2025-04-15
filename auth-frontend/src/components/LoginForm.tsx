'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('localhost:5545');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password || !server) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }

    try {
      // Отправляем запрос на сервер
      const response = await axios.post('/api/auth/login', {
        username,
        password,
        server
      });
      
      if (response.data.success) {
        // Сохраняем данные пользователя в localStorage
        if (response.data.userData) {
          localStorage.setItem('userData', response.data.userData);
        }
        
        toast.success('Авторизация успешна!');
        // Перенаправление на страницу дашборда
        router.push('/dashboard');
      } else {
        setError(response.data.message || 'Произошла ошибка при авторизации');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка сервера. Попробуйте позже.');
      toast.error('Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">Авторизация Pilot-Server</h1>
      
      {error && <div className="p-2 text-sm text-red-500 bg-red-50 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="server" className="block text-sm font-medium text-gray-700">
            Сервер
          </label>
          <input
            id="server"
            type="text"
            value={server}
            onChange={(e) => setServer(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="localhost:5545"
          />
        </div>
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Имя пользователя
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Введите имя пользователя"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Введите пароль"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white bg-primary-500 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
} 