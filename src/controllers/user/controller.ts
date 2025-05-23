import { Request, Response } from 'express';
import User from '../../models/user/user';
import fsHelpers from '../../helpers/fs-helpers';
import userHelpers from '../../helpers/user-helpers';

class AuthController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await userHelpers.getUserFromToken(req);
            if (user) {
                res.status(200).json({ message: "Получение данных пользователя", user: user });
            }
            else {
                res.status(400).json({ message: "Пользователь не найден" });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при получении данных пользователя" });
            console.log(error);
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.query.id;
            const result = await User.deleteOne({ _id: userId });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Успешное удаление данных пользователя" });
            }
            else {
                res.status(400).json({ message: "Пользователь не найден" });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при удалении данных о пользователе" });
            console.log(error);
        }
    }
    static async createUser(req: Request, res: Response) {
        try {
            const user = new User(req.body.user);
            await user.save();
            res.status(200).json({ message: "Успешное создание пользователя", user: user });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при создании пользователя" });
            console.log(error);
        }
    }
    static async updateUser(req: Request, res: Response) {
        try {
            const user = await userHelpers.getUserFromToken(req);
            const updatedUserInfo = JSON.parse(req.body.user);
            if (req.files) {
                const file = await fsHelpers.uploadFiles(req.files);
                updatedUserInfo.avatar = file.filelist[0].url;
            }
            await User.updateOne({ _id: user?._id }, { $set: updatedUserInfo });
            res.status(200).json({ message: "Успешное обновление данных о пользователе", user: updatedUserInfo });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка обновления данных о пользователе" });
            console.log(error);
        }
    }
}

export default AuthController;