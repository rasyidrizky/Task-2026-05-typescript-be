import { Router } from 'express';
import * as contactController from '../controllers/contactController.ts'
import { validateContact } from '../middleware/validate.ts';

const router = Router();

router.put('/:id', validateContact, contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

export default router;