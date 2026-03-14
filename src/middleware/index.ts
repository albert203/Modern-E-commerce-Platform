// src/middleware/index.ts
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';

import { sessionMiddleware } from '../../config/session'; 
import { db } from '../../config/db';
import { rateLimiter } from './rateLimiter'; 

import authRoutes from '../../routes/authRoutes';
import profileRoutes from '../../routes/profileRoutes';
import apiRoutes from '../../routes/apiRoutes';

// ─── App & Config ───────────────────────────────────

const app = express();
app.set('trust proxy', 1); 
const port = process.env.PORT || 3000;

// ─── View Engine Setup ───────────────────────────────

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views')); 


// ─── Core Middleware ─────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '../public')));


// ─── API Routes ──────────────────────────────────────

app.use('/api', rateLimiter);
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', apiRoutes);

// ─── View Routes ─────────────────────────────────────

app.get('/', (_req: Request, res: Response) => {
  res.render('home', { hasHeader: true, hasSubheader: true });
});

app.get('/shop', (_req: Request, res: Response) => {
  res.render('shop', { hasSubheader: true });
});

app.get('/signup', (_req: Request, res: Response) => {
  res.render('signup');
});


// ─── Protected Routes ─────────────────────────────────────────────────────────

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.user) {
    res.redirect('/signup');
    return;
  }
  next();
}

app.get('/profile', requireAuth, (req: Request, res: Response) => {
  const { id, firstName, lastName, email } = req.session.user!;
  res.render('profile', {
    user: { id, firstName, lastName, email },
    hasHeader: true,
    hasSubheader: true,
  });
});

// ─── Error Handling ───────────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something failed!');
});

// ─── Start Server ───────────────────────────────────────────────

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`WSL2: http://<WSL2_IP_ADDRESS>:${port}`);
});

export default db;
