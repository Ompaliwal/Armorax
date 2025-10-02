import 'dotenv/config';
import { createServer } from 'http';
import { connectMongo } from './config/mongo';
import { makeApp } from './http/app';

async function main() {
  // connect to Mongo
  await connectMongo(process.env.MONGO_URL!);

  // create app & start server
  const app = makeApp();
  const port = Number(process.env.PORT ?? 4000);

  createServer(app).listen(port, () => {
    console.log(`API running on :${port}`);
  });
}

// run and handle errors
main().catch(err => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
