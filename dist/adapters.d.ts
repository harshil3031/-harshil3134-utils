import { Request, Response, NextFunction } from 'express';

declare function expressErrorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction): void;

export { expressErrorMiddleware };
