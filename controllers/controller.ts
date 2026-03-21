// controllers/controller.ts
import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import db from '../src/middleware/index.ts';

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    is_admin: number;
}

// ─── Validation Schemas ───────────────────────────────────────────────────────

const userSchema = Joi.object({
    firstName: Joi.string().required().max(50).messages({
        'any.required': 'First name is required.',
        'string.max': 'First name must be less than 50 characters.',
    }),
    lastName: Joi.string().required().max(50).messages({
        'any.required': 'Last name is required.',
        'string.max': 'Last name must be less than 50 characters.',
    }),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .messages({
            'any.required': 'Email is required.',
            'string.email': 'Email must be valid.',
        }),
    password: Joi.string()
        .required()
        .min(12)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
        .messages({
            'any.required': 'Password is required.',
            'string.min': 'Password must be at least 12 characters long.',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
        }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.required': 'Confirm password is required.',
        'any.only': 'Passwords do not match.',
    }),
});

const updateUserSchema = Joi.object({
    firstName: Joi.string().required().max(50).messages({
        'any.required': 'First name is required.',
        'string.max': 'First name must be less than 50 characters.',
    }),
    lastName: Joi.string().required().max(50).messages({
        'any.required': 'Last name is required.',
        'string.max': 'Last name must be less than 50 characters.',
    }),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function checkDuplicateEmail(email: string): Promise<boolean> {
    const [rows]: any = await db.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
    );
    return rows.length > 0;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function createUserRest(req: Request, res: Response) {
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => ({
            field: detail.context?.key,
            message: detail.message,
        }));
        return res.status(400).json({ errors });
    }

    try {
        const emailExists = await checkDuplicateEmail(value.email);
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashPassword = await bcrypt.hash(value.password, 10);

        await db.execute(
            'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
            [value.firstName, value.lastName, value.email, hashPassword]
        );

        res.json({
            message: `User ${value.firstName} ${value.lastName} (${value.email}) created successfully!`,
            user: {
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Unexpected server error occurred' });
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [rows]: any = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user: User = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        req.session.user = {
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
        };
        req.session.isAdmin = user.is_admin === 1;

        res.json({ message: 'Login Successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
}

export function getUser(req: Request, res: Response) {
    if (req.session?.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    }
    res.json({ loggedIn: false });
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (req.session?.user) {
        next();
        return;
    }
    res.status(401).json({ error: 'Unauthorized' });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getAll(req: Request, res: Response) {
    try {
        const [rows]: any = await db.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error connecting to database' });
    }
}

export async function updateUserProfile(req: Request, res: Response) {
    const userId = req.session.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { error, value } = updateUserSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => ({
            field: detail.context?.key,
            message: detail.message,
        }));
        return res.status(400).json({ errors });
    }

    try {
        await db.execute(
            'UPDATE users SET firstname = ?, lastname = ? WHERE id = ?',
            [value.firstName, value.lastName, userId]
        );

        req.session.user = { ...req.session.user, ...value };

        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({ firstName: value.firstName, lastName: value.lastName });
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getProducts(req: Request, res: Response) {
    try {
        const [rows]: any = await db.execute('SELECT * FROM products WHERE stock > 0');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
}