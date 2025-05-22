import { Request, Response } from 'express';
import Dialogs from '../../models/dialogs/dialogs';
import fsHelpers from '../../helpers/fs-helpers';
import moment from 'moment';

class ChatController {
    static async sendMessage(req: Request, res: Response) {
        try {
            const { dialog_id, sender_id, opponent_id, text } = req.body;
            const message = {
                date: moment(Date.now()).format('YYYY:MM:DD'),
                sender_id,
                text,
                files: req.files ? (await fsHelpers.uploadFiles(req.files)).filelist : []
            }
            if (dialog_id) {
                await Dialogs.updateOne({ _id: dialog_id }, { $push: { messages: message } });
                res.status(200).json({ message: "Сообщение успешно отправлено", messageInfo: message });
            }
            else {
                const dialog = new Dialogs({
                    members: [sender_id, opponent_id],
                    messages: [message]
                });
                dialog.save();
                res.status(200).json({ message: "Сообщение успешно отправлено", messageInfo: message });
            }
        }
        catch (error) {
            res.status(400).json({ message: "Ошибка при отправке сообщения" });
            console.log(error);
        }
    }
}

export default ChatController;