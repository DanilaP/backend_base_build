import { Request, Response } from 'express';
import User from '../../models/user/user';
import helpers from '../../helpers/user-helpers';

class AuthController {
    static async registration(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;
            const user = await User.findOne({ email }, { password: 0 });

            if (user) {
                res.status(400).json({ message: "Данный пользователь уже существует" });
            }
            else {
                const user = new User({
                    name: name,
                    email: email, 
                    password: password
                });

                await user.save();

                const token = helpers.generateAccessToken(user._id);
                helpers.setTokenToTheResponse(res, token);
                
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
                    const token = helpers.generateAccessToken(user._id);
                    helpers.setTokenToTheResponse(res, token);
                    res.status(200).json({ message: "Успешный вход", user });
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
    static async logout(req: Request, res: Response) {
        try {
            res.clearCookie("token");
            res.status(200).send('Успешный выход из аккаунта');
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Ошибка выхода из аккаунта');
        }
    }
}

export default AuthController;