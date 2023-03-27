import { randomBytes } from 'crypto';
import express, { Response } from 'express';
import { IRequest, Role, sessionDatabase, User, userDatabase } from './util';

const router = express.Router();

router.use((req: IRequest, res, next) => {
  if (req.user) return res.redirect('/');
  next();
});

router.get('/login', (_, res) => {
  res.render('auth', { title: 'Login', error: '' });
});
router.get('/register', (_, res) => {
  res.render('auth', { title: 'Register', error: '' });
});

type AuthBody = {
  username: string;
  password: string;
}

function handleLogin(body: AuthBody, res: Response): boolean {
  const { username, password } = body;
  const user = userDatabase.get(username);
  if (!user || user.password !== password) return false;
  const newSession = randomBytes(32).toString('hex');
  sessionDatabase.set(newSession, user);
  res.cookie('id', newSession);
  return true;
}
router.post('/login', (req, res) => {
  if (handleLogin(req.body, res)) return res.redirect('/'); // Success
  res.render('auth', {
    title: 'Login',
    error: 'Wrong username or password'
  });
});

function handleRegister(body: AuthBody, res: Response): boolean {
  const { username, password } = body;
  if (userDatabase.get(username)) return false; // User already existed
  const user: User = {
    username,
    password,
    role: Role.USER,
  };
  userDatabase.set(username, user);
  const newSession = randomBytes(32).toString('hex');
  sessionDatabase.set(newSession, user);
  res.cookie('id', newSession);
  return true;
}
router.post('/register', (req, res) => {
  if (handleRegister(req.body, res)) return res.redirect('/'); // Success
  res.render('auth', {
    title: 'Register',
    error: 'Something is wrong',
  });
});

export default router;
