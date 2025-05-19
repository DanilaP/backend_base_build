import { Request, Response } from 'express';
import userHelpers from '../../helpers/user-helpers';
import fsHelpers from '../../helpers/fs-helpers';
import Post from '../../models/post/post';

class PostsController {
    static async createPost(req: Request, res: Response) {
        try {
            const user = await userHelpers.getUserFromToken(req);
            const post = new Post({ 
                user_id: user?._id,
                text: req.body.text,
                files: req.files ? (await fsHelpers.uploadFiles(req.files)).filelist : []
            });
            await post.save();
            res.status(200).json({ message: "Успешное создание поста", post: post });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при создании поста" });
            console.log(error);
        }
    }
    static async deletePost(req: Request, res: Response) {
        try {
            const post = await Post.findOne({ _id: req.query.id });
            await Post.deleteOne({ _id: req.query.id });

            const postFilesURLs = post?.files.map(file => {
                return file.url.replace(process.env.HOST_URL, `./static`);
            }) as string[];

            const result = await fsHelpers.removeFiles(postFilesURLs);

            if (result.status === 200) {
                res.status(200).json({ message: "Успешное удаление поста" });
            }
            else {
                res.status(400).json({ message: "Ошибка при удалении файлов. Возможна потеря данных", post: post });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при удалении поста" });
            console.log(error);
        }
    }
}

export default PostsController;