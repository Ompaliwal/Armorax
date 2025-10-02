// jwt.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../../config/env';

type JwtPayload = { sub: string; email: string };

export function signAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.ACCESS_TTL });
}

export function signRefreshToken(payload: JwtPayload) {
  return jwt.sign(
    { ...payload, jti: crypto.randomUUID() },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.REFRESH_TTL },
  );
}

export function verifyAccess(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload & jwt.JwtPayload;
}

export function verifyRefresh(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload &
    jwt.JwtPayload & { jti: string };
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
