import { Router } from 'express';
import AuthController from './controller';
const router = Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);

export default router;


