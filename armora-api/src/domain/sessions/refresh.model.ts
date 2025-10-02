import ms from 'ms';
import { env } from '../../config/env';
import { RefreshSession } from './session.model';
import { hashToken } from '../auth/tokens';

export async function persistRefreshToken(userId: string, refreshToken: string, meta: { ua?: string; ip?: string }) {
  const tokenHash = hashToken(refreshToken);
  const ttlMs = typeof env.REFRESH_TTL === 'string' ? ms(env.REFRESH_TTL) : Number(env.REFRESH_TTL);
  const expiresAt = new Date(Date.now() + ttlMs);
  return RefreshSession.create({ userId, tokenHash, userAgent: meta.ua, ip: meta.ip, expiresAt });
}

export async function rotateRefreshToken(oldToken: string, newToken: string, userId: string, meta: { ua?: string; ip?: string }) {
  const oldHash = hashToken(oldToken);
  await RefreshSession.updateOne({ userId, tokenHash: oldHash, revokedAt: { $exists: false } }, { $set: { revokedAt: new Date() } }).exec();
  return persistRefreshToken(userId, newToken, meta);
}

export async function isRefreshValid(userId: string, token: string) {
  const tokenHash = hashToken(token);
  const session = await RefreshSession.findOne({ userId, tokenHash, revokedAt: { $exists: false }, expiresAt: { $gt: new Date() } }).exec();
  return !!session;
}
