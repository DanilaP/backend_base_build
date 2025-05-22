import { Router } from 'express';
import ChatController from './controller';
const router = Router();

router.post('/message', ChatController.sendMessage);

export default router;