const { model, Schema } = require('mongoose');

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
});

module.exports = model('User', User);