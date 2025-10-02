// env.ts
import type { SignOptions } from 'jsonwebtoken';

function required(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing env var ${name}`);
  return val;
}

// template-literal friendly type from jsonwebtoken
type TimeSpan = SignOptions['expiresIn'];

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),

  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),

  // accept either name, fall back to sensible default, and cast to the proper type
  ACCESS_TTL: (process.env.ACCESS_TTL ?? process.env.ACCESS_TOKEN_TTL ?? '15m') as TimeSpan,
  REFRESH_TTL: (process.env.REFRESH_TTL ?? process.env.REFRESH_TOKEN_TTL ?? '30d') as TimeSpan,

  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
};
