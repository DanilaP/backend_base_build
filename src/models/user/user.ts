import { model, Schema } from 'mongoose';

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    },
    { 
        strict: "throw",
        strictQuery: true 
    }
);

export default model('User', User);