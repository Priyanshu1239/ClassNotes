import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';

const app = express();
const allowedOrigins = [
    process.env.FRONTEND_URL,               // local dev
    "https://class-notes-3n8b.vercel.app",  // your frontend on vercel
    "https://class-notes-3n8b-9l8nio6xg-priyanshus-projects-2ac856ed.vercel.app"  // new frontend deployment
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true
  };
  

app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

app.use('/api/v1', userRouter);


  

export { app };
