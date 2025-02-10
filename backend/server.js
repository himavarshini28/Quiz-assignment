import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import quizRoutes from './routes/quizRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://quiz-assignment-two.vercel.app', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
