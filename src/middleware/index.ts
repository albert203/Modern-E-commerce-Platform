// src/middleware/index.ts
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import session from 'express-session';
import { sessionMiddleware } from '../../config/session'; // Create this config
import { db } from '../../config/db';
import authRoutes from '../../routes/authRoutes';
import profileRoutes from '../../routes/profileRoutes';
import apiRoutes from '../../routes/apiRoutes';
import { rateLimiter } from './rateLimiter'; 
import { hash } from 'crypto';

// initializes Express and set the port
const app = express();
const port = process.env.PORT || 3000;

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views')); // Assuming your .ejs files are in 'public/views'

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from 'public'

// Api Routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', apiRoutes);

// Rate Limiter applied globally
app.use('/api', rateLimiter);

// View Routes
app.get('/', (req: Request, res: Response) => {
  res.render('home', { hasheader: true,hasSubheader: true });
});
app.get('/shop', (req: Request, res: Response) => {
  res.render('shop', { hasSubheader: true });
});
app.get('/signup', (req: Request, res: Response) => {
  res.render('signup');
});

// Protected Profile View Route
app.get('/profile',
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) return res.redirect('/signup');
    next();
  },
  (req: Request, res: Response) => {
    const safeUser = {
      id: req.session.user!.id,
      firstName: req.session.user!.firstName,
      lastName: req.session.user!.lastName,
      email: req.session.user!.email
    };
    res.render('profile', { user: safeUser, hasSubheader: true });
  },
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something failed!');
});

// app.post('/api/signup', createUserRest);

// Start Server
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`WSL2: http://<WSL2_IP_ADDRESS>:${port}`);
});

export default db;
