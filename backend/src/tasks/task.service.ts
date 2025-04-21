import { PrismaClient, Task } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTasksForUser(userId: number): Promise<Task[]> {
  return prisma.task.findMany({ where: { userId } });
}

export async function createTaskForUser(
  userId: number,
  data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
    category?: string;
  }
): Promise<Task> {
  return prisma.task.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      category: data.category,
    },
  });
}

export async function updateTaskForUser(
  userId: number,
  taskId: number,
  data: Partial<{
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string | null;
    category: string | null;
  }>
): Promise<Task> {
  // Ensure the task belongs to this user
  await prisma.task.findFirstOrThrow({ where: { id: taskId, userId } });
  return prisma.task.update({
    where: { id: taskId },
    data: {
      ...data,
      dueDate: data.dueDate !== undefined ? (data.dueDate ? new Date(data.dueDate) : null) : undefined,
    },
  });
}

export async function deleteTaskForUser(userId: number, taskId: number): Promise<void> {
  // Ensure the task belongs to this user
  await prisma.task.findFirstOrThrow({ where: { id: taskId, userId } });
  await prisma.task.delete({ where: { id: taskId } });
}
