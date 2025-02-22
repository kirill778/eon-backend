// testDB.js
require('dotenv').config({ path: '../../.env' });
const pool = require('./db.ts');

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Подключение к БД успешно!');
    console.log('Время сервера:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Ошибка подключения к БД:', err);
  } finally {
    // Закрываем пул соединений
    await pool.end();
  }
}

testConnection();
