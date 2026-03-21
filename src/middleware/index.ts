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
import adminRoutes from '../../routes/adminRoutes';

// ─── App & Config ─────────────────────────────────────────────────────────────

const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 3000;

// ─── View Engine ──────────────────────────────────────────────────────────────

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public/views'));

// ─── Core Middleware ──────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, '../public')));

// ─── Admin Routes ─────────────────────────────────────────────────────────────

app.use('/admin', adminRoutes);

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/api', rateLimiter);
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', apiRoutes);

// ─── Cart Routes ──────────────────────────────────────────────────────────────

// ─── Cart Helper ──────────────────────────────────────────────────────────────
// Spreads cart data into every res.render so cart.ejs always has what it needs

function cartLocals(req: Request) {
    return {
        cart: req.session.cart ?? { items: [], subtotal: 0 },
        freeShippingThreshold: 200,
    };
}

// ─── Auth Guard ───────────────────────────────────────────────────────────────

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (!req.session.user) {
        res.redirect('/signup');
        return;
    }
    next();
}

// ─── View Routes ──────────────────────────────────────────────────────────────

app.get('/', (req: Request, res: Response) => {
    res.render('home', {
        hasHeader: true,
        hasSubheader: true,
        ...cartLocals(req),
    });
});

app.get('/shop', async (req: Request, res: Response) => {
    try {
        const [products]: any = await db.execute('SELECT * FROM products WHERE stock > 0');
        console.log('Products from DB:', products); // ← add this
        res.render('shop', {
            hasSubheader: true,
            products,
            ...cartLocals(req),
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.render('shop', {
            hasSubheader: true,
            products: [],
            ...cartLocals(req),
        });
    }
});

app.get('/signup', (_req: Request, res: Response) => {
    res.render('signup');
});

// ─── Protected View Routes ────────────────────────────────────────────────────

app.get('/profile', requireAuth, (req: Request, res: Response) => {
    const { id, firstName, lastName, email } = req.session.user!;
    res.render('profile', {
        user: { id, firstName, lastName, email },
        hasHeader: true,
        hasSubheader: true,
        ...cartLocals(req),
    });
});

// ─── Error Handling ───────────────────────────────────────────────────────────

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something failed! error: <br>' + err.message);
});

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`WSL2: http://<WSL2_IP_ADDRESS>:${port}`);
});

export default db;