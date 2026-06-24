import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserbyId);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUsername);

export default router;