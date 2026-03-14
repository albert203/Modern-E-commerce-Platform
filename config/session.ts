// config/session.ts
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { dbConfig } from './db';

const MySQLSessionStore = MySQLStore(session);

const sessionStore = new MySQLSessionStore(dbConfig);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',  
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
});