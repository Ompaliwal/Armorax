import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsMw } from './middleware/cors';
import { errorHandler } from './middleware/error';
import authRouter from './routes/auth.routes';
import meRouter from './routes/me.routes';

export function makeApp() {
  const app = express();
  app.use(corsMw);
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use('/auth', authRouter);
  app.use('/me', meRouter);

  app.use(errorHandler);
  return app;
}
