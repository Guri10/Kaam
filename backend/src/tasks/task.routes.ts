import { Router } from 'express';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask
} from './task.controller';

const router = Router();

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
