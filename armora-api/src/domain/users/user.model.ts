import { Schema, model, InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, index: true, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, trim: true },
}, { timestamps: true });

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: any };
export const User = model('users', UserSchema);
