import mongoose from 'mongoose';
export async function connectMongo(uri: string) {
  await mongoose.connect(uri);
  mongoose.connection.on('connected', () => console.log('mongo ok'));
  mongoose.connection.on('error', (e) => console.error('mongo err', e));
}
