// taskRoutes.ts
import express from 'express';
import { TaskController } from '../controllers/TaskController';
import { validate, TaskSchema } from '../middlewares/validate';

const router = express.Router();

// Rota para criar uma nova tarefa
router.post('/', validate(TaskSchema), TaskController.createTask);

// Rota para listar todas as tarefas (com filtro opcional por categoria)
router.get('/', TaskController.getTasks);

// Rota para obter uma tarefa específica pelo ID
router.get('/:id', TaskController.getTaskById);

// Rota para atualizar uma tarefa específica pelo ID
router.patch('/:id', validate(TaskSchema), TaskController.updateTask);

// Rota para deletar uma tarefa específica pelo ID
router.delete('/:id', TaskController.deleteTask);

export default router;
