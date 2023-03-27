import path from 'path';
import express, { Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { IRequest, sessionDatabase } from './lib/util';
import authRouter from './lib/auth';
import indexRouter from './lib/index';

const app = express();

app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Set user to req.user for easy check authentication
app.use((req: IRequest, res: Response, next: NextFunction) => {
  if (!req.cookies.id) req.user = undefined;
  else req.user = sessionDatabase.get(req.cookies.id);
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
