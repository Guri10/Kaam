import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

import authRoutes from './auth/auth.routes'
import { errorHandler } from './utils/errorHandler'
import { authMiddleware } from './middleware/auth.middleware';
import taskRoutes from './tasks/task.routes';

export const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Health‑check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Auth endpoints
app.use('/api/auth', authRoutes)

// Task endpoints
app.use('/api/tasks', authMiddleware, taskRoutes);

// Global error handler
app.use(errorHandler)
