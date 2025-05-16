import { Request, Response } from 'express';
import User from '../../models/user/user';
import helpers from '../../helpers/user-helpers';

class AuthController {
    static async createUser(req: Request, res: Response) {
        try {
            const user = await helpers.getUserFromToken(req);
            res.status(200).json({ message: "Получение данных пользователя", user: user });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при создании пользователя" });
            console.log(error);
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            const user = await helpers.getUserFromToken(req);

            if (user) {
                await User.deleteOne({ _id: user?._id });
                res.status(200).json({ message: "Успешное удаление данных пользователя" });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при удалении данных о пользователе" });
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
    static async getUser(req: Request, res: Response) {
        try {
            
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка получения данных о пользователе" });
            console.log(error);
        }
    }
}

export default AuthController;