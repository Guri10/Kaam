import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());


// health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});
