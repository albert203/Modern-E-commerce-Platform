import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../../config/cloudinary';

// ─── Multer (memory storage) ──────────────────────────────────────────────────
// We don't write anything to disk — the file buffer is streamed
// directly to Cloudinary and then discarded.

const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit 
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only jpeg and png images are allowed'));
        } 
        else {
            cb(null, true);
        }
    },
});

// ─── Cloudinary Upload Function ───────────────────────────────────────────────
// Takes the Multer file buffer and uploads it to Cloudinary, returning the URL.

export function uploadToCloudinary(
    buffer: Buffer,
    folder = 'sway/products'
): Promise<{ public_id: string; secure_url: string }> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                // Let Cloudinary choose the best quality + format automatically
                transformation: [{ quality: 'auto', fetch_format: 'auto' }],
            },
            (error, result) => {
                if (error || !result) return reject(error ?? new Error('Upload failed'));
                resolve({ public_id: result.public_id, secure_url: result.secure_url });
            }
        );
        // Pipe the in-memory buffer into the upload stream
        streamifier.createReadStream(buffer).pipe(stream);
    });
}