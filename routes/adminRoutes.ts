// routes/adminRoutes.ts
import { Router, type Request, type Response } from 'express';
import { db } from '../config/db';
import cloudinary from '../config/cloudinary';
import { upload, uploadToCloudinary } from '../src/middleware/upload';

const router = Router();

interface Product {
    id: number;
    name: string;
    price: number;
    original_price: number | null;
    image: string | null;
    variant: string | null;
    stock: number;
    created_at: Date;
}

export function cloudinaryUrl(publicId: string, width = 600): string {
    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_auto,f_auto/${publicId}`;
}

// ── Guard ─────────────────────────────────────────────────────────────────────
function adminGuard(req: Request, res: Response, next: () => void): void {
    if (req.session.user && req.session.isAdmin) return next();
    res.redirect('/signup');
}

// ── GET /admin ────────────────────────────────────────────────────────────────
router.get('/', adminGuard, async (req: Request, res: Response) => {
    try {
        const [products] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
        res.render('admin/index', {
            products: products as Product[],
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    } catch (err) {
        console.error('Admin index error:', err);
        res.status(500).send('Database error');
    }
});

// ── GET /admin/products/new ───────────────────────────────────────────────────
router.get('/products/new', adminGuard, (_req: Request, res: Response) => {
    res.render('admin/product-form', {
        product: null,
        error: null,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
});

// ── POST /admin/products ──────────────────────────────────────────────────────
router.post('/products', adminGuard, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { name, price, original_price, variant, stock } = req.body as {
            name: string;
            price: string;
            original_price?: string;
            variant?: string;
            stock: string;
        };

        let imagePublicId: string | null = null;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imagePublicId = result.public_id;
        }

        await db.execute(
            `INSERT INTO products (name, price, original_price, image, variant, stock)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                parseFloat(price),
                original_price ? parseFloat(original_price) : null,
                imagePublicId,
                variant || null,
                parseInt(stock) || 0,
            ]
        );

        res.redirect('/admin');
    } catch (err: any) {
        console.error('Create product error:', err);
        res.render('admin/product-form', {
            product: null,
            error: err.message,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    }
});

// ── GET /admin/products/:id/edit ──────────────────────────────────────────────
router.get('/products/:id/edit', adminGuard, async (req: Request, res: Response) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
        const products = rows as Product[];
        if (!products.length) { res.status(404).send('Product not found'); return; }
        res.render('admin/product-form', {
            product: products[0],
            error: null,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    } catch (err) {
        res.status(500).send('Database error');
    }
});

// ── POST /admin/products/:id ──────────────────────────────────────────────────
router.post('/products/:id', adminGuard, upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, original_price, variant, stock } = req.body as {
            name: string;
            price: string;
            original_price?: string;
            variant?: string;
            stock: string;
        };

        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        const existing = (rows as Product[])[0];
        if (!existing) { res.status(404).send('Product not found'); return; }

        let imagePublicId = existing.image;
        if (req.file) {
            if (existing.image) {
                await cloudinary.uploader.destroy(existing.image).catch(() => {});
            }
            const result = await uploadToCloudinary(req.file.buffer);
            imagePublicId = result.public_id;
        }

        await db.execute(
            `UPDATE products
             SET name = ?, price = ?, original_price = ?, image = ?, variant = ?, stock = ?
             WHERE id = ?`,
            [
                name,
                parseFloat(price),
                original_price ? parseFloat(original_price) : null,
                imagePublicId,
                variant || null,
                parseInt(stock) || 0,
                id,
            ]
        );

        res.redirect('/admin');
    } catch (err: any) {
        console.error('Update product error:', err);
        res.render('admin/product-form', {
            product: { id: req.params.id, ...req.body },
            error: err.message,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        });
    }
});

// ── POST /admin/products/:id/delete ──────────────────────────────────────────
router.post('/products/:id/delete', adminGuard, async (req: Request, res: Response) => {
    try {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
        const product = (rows as Product[])[0];
        if (product?.image) {
            await cloudinary.uploader.destroy(product.image).catch(() => {});
        }
        await db.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.redirect('/admin');
    } catch (err) {
        res.status(500).send('Database error');
    }
});

export default router;