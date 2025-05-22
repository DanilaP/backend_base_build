import { Router } from 'express';
import UsersController from './controller';
const router = Router();

router.get('/', UsersController.getUsers);
router.post('/', UsersController.getUsersWithFilters);

export default router;