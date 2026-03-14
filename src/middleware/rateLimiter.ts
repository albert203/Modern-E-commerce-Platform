// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req) => {
        return req.ip ?? req.socket.remoteAddress ?? 'unknown';
    },
    message: "Too many requests from this IP, please try again after 15 minutes",
});