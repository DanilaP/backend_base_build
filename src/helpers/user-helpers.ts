import { Request, Response } from "express";
import User from "../models/user/user";
import jwt from "jsonwebtoken";
const jwt_decode = require("jwt-decode");

async function getUserFromToken(req: Request) {
    try {
        const token = req.cookies.token;    
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

function setTokenToTheResponse(res: Response, token: string) {
    const responseWithCookies = res;
    responseWithCookies.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });
}

export default { getUserFromToken, generateAccessToken, setTokenToTheResponse };