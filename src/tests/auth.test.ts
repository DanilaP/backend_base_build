import { Request, Response } from 'express';
const AuthController = require('../controllers/auth/controller');
const Helpers = require('../helpers/user-helpers');
const User = require('../models/user/user');

jest.mock('../models/user/user');
jest.mock('../helpers/user-helpers');

const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};

const req = {
    body: {
        email: 'user__email', 
        password: 'user__password',
        name: 'user__name',
    },
} as Request;

describe('Тестирование метода registration из AuthController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it(`Метод возвращает объект с информацией о пользователе и сообщение о завершении при корректно переданных данных`, async () => {
        const res = mockResponse();
        
        (User.findOne as jest.Mock).mockResolvedValueOnce(null);
        (Helpers.generateAccessToken as jest.Mock).mockReturnValueOnce('token');
        
        await AuthController.registration(req, res);

        expect(Helpers.generateAccessToken).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(User).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.anything(),
            message: "Регистрация прошла успешно"
        }));
    });

    it(`Метод возвращает 400 статус код и сообщение о завершении, если пользователь уже существует`, async () => {
        const res = mockResponse();
        
        (User.findOne as jest.Mock).mockResolvedValueOnce({ _id: 'some_id' });
        
        await AuthController.registration(req, res);

        expect(Helpers.generateAccessToken).toHaveBeenCalledTimes(0);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Данный пользователь уже существует",
        }));
    });
});