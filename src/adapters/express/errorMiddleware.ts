import { Request, Response, NextFunction } from "express";
import { errorSerializer } from "../../errors/errorSerializer";

export function expressErrorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const serialized = errorSerializer(err);
  res.status(serialized.statusCode).json(serialized);
}