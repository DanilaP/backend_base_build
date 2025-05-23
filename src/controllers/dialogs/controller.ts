import { Request, Response } from 'express';
import userHelpers from '../../helpers/user-helpers';
import Dialogs from '../../models/dialogs/dialogs';
import User from '../../models/user/user';

class DialogsController {
    static async getUserDialogs(req: Request, res: Response) {
        try {
            const user = await userHelpers.getUserFromToken(req);
            const dialogs = await Dialogs.find({ members: user?._id })
                .populate({
                    path: 'members',
                    select: 'name avatar', 
                    model: User
                })
                .exec();
            res.status(200).json({ message: "Информация о диалогах успешно получена", dialogs });
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка получения информации о диалогах" });
            console.log(error);
        }
    }
}

export default DialogsController;