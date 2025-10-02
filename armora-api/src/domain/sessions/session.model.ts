import { Schema, model } from 'mongoose';

const RefreshSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', index: true },
  tokenHash: { type: String, index: true },
  userAgent: String,
  ip: String,
  expiresAt: { type: Date, index: true },
  revokedAt: Date,
}, { timestamps: true });

export type RefreshSessionDoc = {
  _id: any; userId: any; tokenHash: string; userAgent?: string; ip?: string;
  expiresAt: Date; revokedAt?: Date | null;
};
export const RefreshSession = model('refresh_sessions', RefreshSessionSchema);
