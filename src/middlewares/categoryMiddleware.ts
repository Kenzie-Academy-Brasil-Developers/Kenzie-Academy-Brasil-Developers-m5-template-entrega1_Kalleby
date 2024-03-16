// CategoryMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import { AppError } from "../errors/AppErrors";

const prisma = new PrismaClient();

export class CategoryMiddleware {
  public async categoryExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { categoryId } = req.params;

    const foundCategory = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    res.locals.foundCategory = foundCategory;
    next();
  }

  public async verifyCategoryOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(res.locals.sub);
    const { foundCategory } = res.locals;

    if (foundCategory.userId !== userId) {
      throw new AppError("This user is not the category owner", 403);
    }

    next();
  }
}

export const categoryMiddlewares = new CategoryMiddleware();
