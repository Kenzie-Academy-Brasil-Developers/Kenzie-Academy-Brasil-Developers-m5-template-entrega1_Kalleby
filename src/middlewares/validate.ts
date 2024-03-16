// validate.ts
import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number().optional(),
});

export const CategorySchema = z.object({
  name: z.string(),
});

export const validate = (schema: z.ZodSchema<any>) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
