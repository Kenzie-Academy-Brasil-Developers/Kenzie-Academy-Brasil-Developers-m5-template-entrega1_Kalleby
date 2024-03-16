// errorHandlingMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppErrors';

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Se o erro for uma instância de AppError, sabemos que foi um erro tratado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Para erros não tratados, loga o erro e retorna um erro genérico
  console.error(`[Error]: ${err.message}`);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
