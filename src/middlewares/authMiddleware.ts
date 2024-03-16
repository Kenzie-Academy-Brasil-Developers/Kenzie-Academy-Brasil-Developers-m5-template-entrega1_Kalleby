import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send({ message: "Token is required" });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user: any) => {
    if (err) return res.status(403).send({ message: "Token is invalid" });
    req.user = user;
    next();
  });
};
