// CategoryService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryService {
  async createCategory(data: { name: string }) {
    const category = await prisma.category.create({
      data,
    });
    return category;
  }

  async getCategoryById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        tasks: true, 
      },
    });
    return category;
  }

  async deleteCategory(id: number) {
    await prisma.category.delete({
      where: { id },
    });
  }
}

export const categoryService = new CategoryService();
