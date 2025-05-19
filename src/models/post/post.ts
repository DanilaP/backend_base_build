import { model, Schema } from 'mongoose';

const Post = new Schema(
    {
        user_id: { 
            type: String, 
            required: true 
        },
        text: {
            type: String,
            default: ""
        },
        files: {
            type: Array,
            default: []
        },
        likes: [{
            type: String,
            default: 0
        }]
    },
    { 
        strict: "throw",
        strictQuery: true 
    }
);

export default model('Post', Post);