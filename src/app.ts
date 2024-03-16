// app.ts
import express from 'express';
import helmet from 'helmet';
import taskRoutes from './routes/tasksRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

app.use(errorHandlingMiddleware);

export default app;
