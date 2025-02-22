import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import routes from './src/routes';

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'https://eon-app-pi.vercel.app',
      'http://localhost:3000',
      'http://192.168.1.4:3000'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Добавляем парсер для cookies
app.use(cookieParser());

// Парсер для JSON
app.use(express.json());

// Подключаем маршруты
app.use('/api', routes);

const PORT = parseInt(process.env.PORT || '5000', 10);

// Обработчик GET /
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ status: "ok", message: "Backend API is running" });
});

// Обработчик для всех остальных маршрутов
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// Запуск сервера
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;