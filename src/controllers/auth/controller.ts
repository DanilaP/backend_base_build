import { Request, Response } from 'express';
import User from '../../models/user/user';
import helpers from '../../helpers/user-helpers';

class AuthController {
    static async registration(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;
            const user = await User.findOne({ email });
    
            if (user) {
                res.status(400).json({ message: "Данный пользователь уже существует" });
            }
            else {
                const user = new User({
                    name: name,
                    email: email, 
                    password: password, 
                    avatar: "avatar",
                });

                await user.save();
                const token = helpers.generateAccessToken(user._id);

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'strict'
                });
                res.status(200).json({ message: "Регистрация прошла успешно", user: user });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка регистрации" });
            console.log(error);
        }
    }
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                res.status(400).json({ message: "Пользователя не существует" });
            }
            else {
                if (password === user.password) {
                    res.status(200).json({ message: "Успешный вход" });
                }
                else {
                    res.status(400).json({ message: "Неверный пароль" });
                }
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка входа" });
            console.log(error);
        }
    }
}

export default AuthController;