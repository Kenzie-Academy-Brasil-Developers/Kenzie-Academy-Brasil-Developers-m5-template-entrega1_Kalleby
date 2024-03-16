// categoryRoutes.ts
import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { validate, CategorySchema } from '../middlewares/validate';

const router = express.Router();

// Rota para criar uma nova categoria
router.post('/', validate(CategorySchema), CategoryController.createCategory);

// Rota para deletar uma categoria específica pelo ID
router.delete('/:id', CategoryController.deleteCategory);

export default router;
