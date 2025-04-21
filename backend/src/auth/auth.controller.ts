import { Request, Response, NextFunction } from 'express'
import * as authService from './auth.service'

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body
    const { user, token } = await authService.registerUser(name, email, password)
    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    })
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const { user, token } = await authService.loginUser(email, password)
    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    })
  } catch (err) {
    next(err)
  }
}
