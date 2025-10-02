import { NextFunction, Request, Response } from 'express';
import { verifyAccess } from '../../domain/auth/tokens';

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = verifyAccess(token);
    (req as any).user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
