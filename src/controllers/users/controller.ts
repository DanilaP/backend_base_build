import { Request, Response } from 'express';
import User from '../../models/user/user';
import helpers from '../../helpers/user-helpers';

class AuthController {
    static async createUser(req: Request, res: Response) {
        try {
            const token = helpers.getUserFromToken(req);
            console.log(token);
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при создании пользователя" });
            console.log(error);
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            
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