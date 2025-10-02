import { Router } from 'express';
import { authGuard } from '../middleware/authGuard';

const router = Router();

router.get('/', authGuard, async (req, res) => {
  const user = (req as any).user;
  res.json({ user });
});

export default router;
