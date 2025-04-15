'use client';

import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Система авторизации</title>
      </head>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
} 