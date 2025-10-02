import { Router } from 'express';
import { z } from 'zod';
import { createUser, findByEmail } from '../../domain/users/user.repo';
import { hashPassword, verifyPassword } from '../../domain/auth/password';
import { signAccessToken, signRefreshToken, verifyRefresh } from '../../domain/auth/tokens';
import { isRefreshValid, persistRefreshToken, rotateRefreshToken } from '../../domain/sessions/refresh.model';

const router = Router();

const RegisterDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});
const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function setRefreshCookie(res: any, refreshToken: string) {
  // For mobile apps, you might not use cookies. If you do, set secure flags in prod.
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/auth/token/refresh',
    maxAge: 1000 * 60 * 60 * 24 * 30, // match REFRESH_TTL
  });
}

router.post('/register', async (req, res, next) => {
  try {
    const body = RegisterDto.parse(req.body);
    const existing = await findByEmail(body.email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await hashPassword(body.password);
    const user = await createUser({ email: body.email, passwordHash, name: body.name });

    const access = signAccessToken({ sub: String(user._id), email: user.email });
    const refresh = signRefreshToken({ sub: String(user._id), email: user.email });
    await persistRefreshToken(String(user._id), refresh, { ua: req.get('user-agent') ?? '', ip: req.ip });
    setRefreshCookie(res, refresh);

    res.status(201).json({
      user: { id: user._id, email: user.email, name: user.name },
      tokens: { access, refresh }, // send refresh here too for RN apps storing it client-side
    });
  } catch (e) { next(e); }
});

router.post('/login', async (req, res, next) => {
  try {
    const body = LoginDto.parse(req.body);
    const user = await findByEmail(body.email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await verifyPassword(body.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const access = signAccessToken({ sub: String(user._id), email: user.email });
    const refresh = signRefreshToken({ sub: String(user._id), email: user.email });
    await persistRefreshToken(String(user._id), refresh, { ua: req.get('user-agent') ?? '', ip: req.ip });
    setRefreshCookie(res, refresh);

    res.json({
      user: { id: user._id, email: user.email, name: user.name },
      tokens: { access, refresh },
    });
  } catch (e) { next(e); }
});

router.post('/token/refresh', async (req, res, next) => {
  try {
    const fromCookie: string | undefined = (req as any).cookies?.refreshToken;
    const fromBody: string | undefined = req.body?.refreshToken;
    const presented = fromBody ?? fromCookie;
    if (!presented) return res.status(400).json({ error: 'Missing refresh token' });

    const payload = verifyRefresh(presented);
    const valid = await isRefreshValid(payload.sub, presented);
    if (!valid) return res.status(401).json({ error: 'Refresh token invalid' });

    const newAccess = signAccessToken({ sub: payload.sub, email: payload.email });
    const newRefresh = signRefreshToken({ sub: payload.sub, email: payload.email });
    await rotateRefreshToken(presented, newRefresh, payload.sub, { ua: req.get('user-agent') ?? '', ip: req.ip });

    setRefreshCookie(res, newRefresh);
    res.json({ tokens: { access: newAccess, refresh: newRefresh } });
  } catch (e) { next(e); }
});

// Optional: logout (revoke one token)
router.post('/logout', async (req, res) => {
  // Client should send the currently held refresh token to revoke
  const token: string | undefined = req.body?.refreshToken ?? (req as any).cookies?.refreshToken;
  if (!token) return res.status(200).json({ ok: true }); // nothing to do
  // Mark revoked via rotate-like logic:
  // we don't have userId without verifying; verify but ignore result
  try {
    const p = verifyRefresh(token);
    await rotateRefreshToken(token, 'revoked-' + Date.now(), p.sub, { ua: '', ip: '' }); // marks old as revoked
  } catch {}
  res.clearCookie('refreshToken', { path: '/auth/token/refresh' });
  res.json({ ok: true });
});

export default router;
