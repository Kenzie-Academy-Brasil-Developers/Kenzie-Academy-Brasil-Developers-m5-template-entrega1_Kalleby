import express from 'express';
import helmet from 'helmet';
import taskRoutes from './routes/tasksRoutes'; // Ajuste o caminho conforme necessário
import categoryRoutes from './routes/categoryRoutes'; // Ajuste o caminho conforme necessário
import userRoutes from './routes/userRoutes'; // Ajuste o caminho conforme necessário
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import { authenticateToken } from './middlewares/authMiddleware'; // Ajuste o caminho conforme necessário

const app = express();

app.use(helmet());
app.use(express.json());

// Rotas públicas
app.use('/users', userRoutes);

// Middleware de autenticação aplicado às rotas que requerem autenticação
app.use(authenticateToken);

// Rotas protegidas
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

// Middleware de tratamento de erros
app.use(errorHandlingMiddleware);

export default app;
