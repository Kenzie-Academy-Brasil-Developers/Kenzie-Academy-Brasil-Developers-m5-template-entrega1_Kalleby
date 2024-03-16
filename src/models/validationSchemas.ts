import { z } from 'zod';

// Esquema de validação para criação de categoria
export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

// Esquema de validação para criação de tarefa
export const TaskCreateSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  categoryId: z.number().optional(),
});

// Esquema de validação para atualização de tarefa
// Permitindo que todos os campos sejam opcionais na atualização
export const TaskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  finished: z.boolean().optional(),
  categoryId: z.number().nullable().optional(),
});
