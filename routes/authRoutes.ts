// routes/authRoutes.ts
// Routes for authentication
import { createUserRest, loginUser, logoutUser, getUser } from '../controllers/controller';
import { Router } from 'express';
const router = Router();

router.post('/signup', createUserRest);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/user', getUser);

export default router;
