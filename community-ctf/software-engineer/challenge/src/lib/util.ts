import { Database } from "@drstrain/database";
import { Request } from 'express';

export enum Role {
  ADMIN = 0,
  USER = 1,
}

export interface User {
  username: string;
  password: string;
  role: Role;
}

const admin: User = {
  username: 'admin',
  password: process.env.ADMIN_PASSWORD,
  role: Role.ADMIN,
}

const userDatabase = new Database();
userDatabase.set('admin', admin);

export { userDatabase };
export const sessionDatabase = new Database('session');
export interface IRequest extends Request {
  user: User;
  cookies: { id: string};
}
