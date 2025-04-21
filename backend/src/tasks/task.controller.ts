import { Request, Response, NextFunction } from 'express';
import * as service from './task.service';
import { AuthRequest } from '../middleware/auth.middleware';

export async function listTasks(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const tasks = await service.getTasksForUser(req.userId!);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const task = await service.createTaskForUser(req.userId!, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const taskId = Number(req.params.id);
    const task = await service.updateTaskForUser(req.userId!, taskId, req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const taskId = Number(req.params.id);
    await service.deleteTaskForUser(req.userId!, taskId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}
