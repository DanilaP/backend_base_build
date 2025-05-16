import { Request, Response } from 'express';
import User from '../../models/user/user';

class AuthController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await User.findOne({ _id: req.query.id }, { password: 0 });
            res.status(200).json({ message: "Получение данных пользователя", user: user });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при получении данных пользователя" });
            console.log(error);
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.query.id;
            await User.deleteOne({ _id: userId });
            res.status(200).json({ message: "Успешное удаление данных пользователя" });
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
            
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка обновления данных о пользователе" });
            console.log(error);
        }
    }
}

export default AuthController;