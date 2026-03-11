// config/session.ts
// session configuration
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { dbConfig } from './db';

// Create a new MySQLStore instance using dbConfig
const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore(dbConfig);

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  store: sessionStore,
  resave: false, // prevents unnecessary session updates.
  saveUninitialized: false, // Set to false to not save empty sessions
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to 'true' in production for HTTPS to encrypt cookie data
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
});
