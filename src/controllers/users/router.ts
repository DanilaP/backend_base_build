import { Router } from 'express';
import UserController from './controller';
const router = Router();

router.get('/', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);

export default router;


