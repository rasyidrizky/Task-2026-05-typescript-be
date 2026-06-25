import { Router } from 'express';
import * as userController from '../controllers/userController.ts';
import * as contactController from '../controllers/contactController.ts'
import { validateUser, validateUpdate, validateContact } from '../middleware/validate.ts';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserbyId);
router.post('/', validateUser, userController.createUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', validateUpdate, userController.updateUsername);

router.get('/:userId/contacts', contactController.getContactUser);
router.post('/:userId/contacts', validateContact, contactController.createContact);

export default router;