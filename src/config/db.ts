import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Define interfaces for different types of database rows
interface TimeRow {
  now: string;
}

interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserBasicRow {
  id: number;
  username: string;
  email: string;
}

interface CourseRow {
  id: number;
  title: string;
  description: string;
}

// Временно закомментировано подключение к БД
/*
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
*/

// Временный мок объекта pool с поддержкой типов
const pool = {
  query: async (text: string, params?: any[]): Promise<{ rows: any[] }> => {
    // Мок для SELECT NOW()
    if (text === 'SELECT NOW()') {
      return { rows: [{ now: new Date().toISOString() }] };
    }
    // Мок для проверки пользователя
    if (text.includes('SELECT * FROM users WHERE')) {
      return { rows: [{
        id: 1,
        username: 'test_user',
        email: 'test@example.com',
        password: 'hashed_password'
      }] };
    }
    // Мок для создания пользователя
    if (text.includes('INSERT INTO users')) {
      const [username, email] = params || [];
      return { 
        rows: [{ 
          id: 1, 
          username, 
          email,
          password: 'mocked_password'
        }]
      };
    }
    // Мок для получения данных пользователя
    if (text.includes('SELECT id, username, email FROM users')) {
      return { 
        rows: [{ 
          id: 1, 
          username: 'test_user', 
          email: 'test@example.com'
        }]
      };
    }
    // Мок для получения курса
    if (text.includes('SELECT * FROM courses')) {
      return { 
        rows: [{ 
          id: 1, 
          title: 'Test Course', 
          description: 'Test Description' 
        }]
      };
    }
    // Дефолтный ответ
    return { rows: [] };
  }
};

export default pool;