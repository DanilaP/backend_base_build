import { Router } from 'express';
import PostsController from './controller';
const router = Router();

router.post('/', PostsController.createPost);
router.delete('/', PostsController.deletePost);

export default router;