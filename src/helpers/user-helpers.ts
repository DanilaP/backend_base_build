import { Request } from "express";
const jwt_decode = require('jwt-decode');
const User = require("../models/user/user");
const jwt = require('jsonwebtoken');

async function getUserFromToken(req: Request) {
    try {
        const token = req.headers.authorization;    
        const userId = jwt_decode(token);
        const user = await User.findOne({_id: userId.id});
        return user;
    } 
    catch (error) {
        console.log(error);
        return "Ошибка при получении пользователя!";
    }
}

function generateAccessToken(id: string | number) {
    const payload = {
        id: id,
    }
    const token = jwt.sign(payload, "SECRET_KEY_RANDOM", { expiresIn: "24h" });
    return token;
}

module.exports = { getUserFromToken, generateAccessToken };