import { Request, Response } from 'express';
import UserController from '../controllers/user/controller';
import Helpers from '../helpers/user-helpers';
import User from '../models/user/user';

jest.mock('../models/user/user');
jest.mock('../helpers/user-helpers');

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};

describe('Тестирование метода get /user', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const req: any = {
        body: {
            email: 'user__email', 
            password: 'user__password'
        },
        query: {
            id: 'some_id'
        }
    };
    it('Метод возвращает 200 статус код и сообщение об успешном получении данных если пользователь найден', async () => {
        const res = mockResponse();

        (User.findOne as jest.Mock).mockResolvedValueOnce({ name: "name", email: "email", avatar: "avatar" });

        await UserController.getUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.anything(),
            message: "Получение данных пользователя",
        }));
    })
    it('Метод возвращает 400 статус код и сообщение о том, что пользователь не найден, если пользователь не существует', async () => {
        const res = mockResponse();

        (User.findOne as jest.Mock).mockResolvedValueOnce(null);

        await UserController.getUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Пользователь не найден"
        }));
    })
})
describe('Тестирование метода delete /user', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const req: any = {
        body: {
            email: 'user__email', 
            password: 'user__password'
        },
        query: {
            id: 'some_id'
        }
    };
    it('Метод возвращает 200 статус код и сообщение об успешном удалении данных если пользователь найден', async () => {
        const res = mockResponse();

        (User.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 1 });

        await UserController.deleteUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Успешное удаление данных пользователя"
        }));
    })
    it('Метод возвращает 400 статус код и сообщение о том, что пользователь не найден, если пользователь не существует', async () => {
        const res = mockResponse();

        (User.deleteOne as jest.Mock).mockResolvedValueOnce({ deletedCount: 0 });

        await UserController.deleteUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Пользователь не найден"
        }));
    })
})