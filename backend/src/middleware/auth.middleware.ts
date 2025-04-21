import { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

// Extend Express’s Request so we can attach userId
export interface AuthRequest extends Request {
  userId?: number
}

interface JwtPayload {
  userId: number
  iat: number
  exp: number
}

const JWT_SECRET = process.env.JWT_SECRET!

export const authMiddleware: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' })
    return
  }

  const token = authHeader.slice(7) // everything after 'Bearer '
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
    req.userId = payload.userId
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
    return
  }
}
