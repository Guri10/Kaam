import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err)
  res.status(400).json({ success: false, message: err.message || 'An error occurred' })
}
