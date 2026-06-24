import { Router } from 'express';
import * as userController from '../controllers/userController.ts';
import { validateUser, validateUpdate } from '../middleware/validate.ts';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserbyId);
router.post('/', validateUser, userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', validateUpdate, userController.updateUsername);

export default router;