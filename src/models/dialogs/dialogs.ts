import { model, Schema } from 'mongoose';

const Dialogs = new Schema(
    {   
        members: [{
            type: String,
            required: true,
            default: [],
        },],
        messages: [{
            type: {
                date: String,
                text: String,
                files: Array,
                sender_id: String
            },
            default: [],
        }],
    },
    { 
        strict: "throw",
        strictQuery: true 
    }
);

export default model('Dialogs', Dialogs);