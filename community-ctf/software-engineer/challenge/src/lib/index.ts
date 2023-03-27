import express, { Response } from 'express';
import { IRequest, Role } from './util';

const router = express.Router();

router.get('/', (req: IRequest, res: Response) => {
  if (!req.user) return res.redirect('/auth/login');
  const secret = req.user.role === Role.USER ? 'No secret for you' : process.env.FLAG;
  res.render('index', {
    user: req.user,
    secret,
  });
});

export default router;
