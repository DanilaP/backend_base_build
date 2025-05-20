import { Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
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
    static async likePost(req: Request, res: Response) {
        try {
            const userId = (jwt.decode(req.cookies?.token) as JwtPayload).id.toString();
            const post = await Post.findOne({ _id: req.body.id }); 
            if (post) {
                await Post.updateOne(
                    { _id: req.body.id }, 
                    [ 
                        {
                            $set: {
                                likes: {
                                    $cond: [
                                        { $in: [userId, "$likes"] },
                                        { $filter: { input: "$likes", cond: { $ne: ["$$this", userId] } } },
                                        { $concatArrays: ["$likes", [userId]] }
                                    ]
                                }
                            }
                        }
                    ]
                );
                res.status(200).json({ message: "Информация о лайке изменена" });
            }
            else {
                res.status(400).json({ message: "Пост не найден" });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при изменении информации о посте" });
            console.log(error);
        }
    }
}

export default PostsController;