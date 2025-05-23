import { Router } from 'express';
import DialogsController from './controller';
const router = Router();

router.get('/', DialogsController.getUserDialogs);

export default router;