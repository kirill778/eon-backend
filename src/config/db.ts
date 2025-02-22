import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,      // Имя пользователя БД
  host: process.env.DB_HOST,      // Адрес сервера БД
  database: process.env.DB_NAME,  // Имя базы данных
  password: process.env.DB_PASSWORD, // Пароль пользователя
  port: parseInt(process.env.DB_PORT || '5432'),      // Порт подключения (обычно 5432)
});

// Проверка подключения
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка подключения к БД:', err);
  } else {
    console.log('БД подключена успешно');
  }
});

export default pool;