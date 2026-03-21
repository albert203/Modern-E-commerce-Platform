// config/session.ts
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { dbConfig } from './db';

const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore(dbConfig);

// ─── Session Type Augmentation ────────────────────────────────────────────────
// Extends express-session's SessionData so TypeScript knows about our
// custom properties (user, cart, isAdmin) without casting everywhere.

declare module 'express-session' {
    interface SessionData {
        user?: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
        };
        cart?: {
            items: any[];
            subtotal: number;
        };
        isAdmin?: boolean;
    }
}

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