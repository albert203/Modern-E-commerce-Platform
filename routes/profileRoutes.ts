// routes/profileRoutes.ts
// Routes for profile
import { authMiddleware, updateUserProfile, /* getProfile */} from '../controllers/controller';
import { Router } from 'express';
const router = Router();

// router.get('/profile', authMiddleware, getProfile);
router.post('/update-profile', authMiddleware, updateUserProfile);

export default router;
