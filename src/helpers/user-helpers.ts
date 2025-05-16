import { Request } from "express";
import User from "../models/user/user";
import jwt from "jsonwebtoken";
const jwt_decode = require("jwt-decode");

async function getUserFromToken(req: Request) {
    try {
        const token = req.headers.authorization;    
        const userId = jwt_decode(token);
        const user = await User.findOne({ _id: userId.id });
        return user;
    } 
    catch (error) {
        console.log(error);
        return "Ошибка при получении пользователя!";
    }
}

function generateAccessToken(id: any) {
    const payload = {
        id: id,
    };
    const token = jwt.sign(payload, "SECRET_KEY_RANDOM", { expiresIn: "24h" });
    return token;
}

export default { getUserFromToken, generateAccessToken };