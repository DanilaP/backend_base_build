import { Response } from 'express';
import UserController from '../controllers/user/controller';
import User from '../models/user/user';
import userHelpers from '../helpers/user-helpers';

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

        (userHelpers.getUserFromToken as jest.Mock).mockResolvedValueOnce({ name: "name", email: "email", avatar: "avatar" });
        
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
            user: {
                name: "new_user", 
                email: "new_email", 
                password: "new_password",
                avatar: "new_avatar"
            }
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
})
describe("Тестирование метода post /user", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const req: any = {
        body: {
            user: {
                name: "new_user", 
                email: "new_email", 
                password: "new_password",
                avatar: "new_avatar"
            }
        },
        query: {
            id: 'some_id'
        }
    };
    const uncorrectReq: any = {
        body: {
            user: {}
        },
        query: {
            id: 'some_id'
        }
    };
    it('Метод возвращает 200 статус код и сообщение об успешном создании пользователя при валидных данных', async () => {
        const res = mockResponse();
        await UserController.createUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.anything(),
            message: "Успешное создание пользователя"
        }));
    })
    it('Метод возвращает 400 статус код и сообщение об успешном создании пользователя при невалидных данных', async () => {
        const res = mockResponse();
        User.prototype.save.mockRejectedValue(new Error('Validation failed'));
        
        await UserController.createUser(uncorrectReq, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Ошибка при создании пользователя"
        }));
    })
})