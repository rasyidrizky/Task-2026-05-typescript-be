import { Router } from "express";
import userRoutes from './userRoutes.ts'
import contactRoutes from './contactRoutes.ts'

const router = Router();

router.use('/users', userRoutes);
router.use('/contacts', contactRoutes);

export default router;