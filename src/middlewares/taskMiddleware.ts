// TaskMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { AppError } from "../errors/AppErrors";

const prisma = new PrismaClient();

export class TaskMiddleware {
  public async taskExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { taskId } = req.params;

    const foundTask = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }

    res.locals.foundTask = foundTask;
    next();
  }

  public async verifyTaskOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(res.locals.sub);
    const { foundTask } = res.locals;

    if (foundTask.userId !== userId) {
      throw new AppError("This user is not the task owner", 403);
    }

    next();
  }

  public async categoryIdExistsInBody(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { categoryId } = req.body;

    if (!categoryId) return next();

    const foundCategory = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    next();
  }
}

export const taskMiddlewares = new TaskMiddleware();
