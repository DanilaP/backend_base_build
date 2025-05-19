import { Request, Response } from 'express';

class PostsController {
    static async createPost(req: Request, res: Response) {
        try {
            
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при создании поста" });
            console.log(error);
        }
    }
    static async deletePost(req: Request, res: Response) {
        try {
            
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при удалении поста" });
            console.log(error);
        }
    }
}

export default PostsController;