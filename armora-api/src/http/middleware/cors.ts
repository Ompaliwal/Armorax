import cors from 'cors';
import { env } from '../../config/env';
export const corsMw = cors({ origin: env.CORS_ORIGIN, credentials: true });
