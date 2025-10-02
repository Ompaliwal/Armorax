import { User, UserDoc } from './user.model';

export async function findByEmail(email: string) {
  return User.findOne({ email: email.toLowerCase() }).exec();
}

export async function createUser(data: { email: string; passwordHash: string; name?: string }): Promise<UserDoc> {
  const u = await User.create({ ...data });
  return u;
}
