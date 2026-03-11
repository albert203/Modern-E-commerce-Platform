// routes/apiRoutes.ts
// Routes for api endpoints
import { getAll } from '../controllers/controller'
import { Router } from 'express';
const router = Router();

router.get('/getall', getAll);

export default router;
