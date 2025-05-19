import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import http from 'http';
import ws from 'ws';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './src/controllers/auth/router'; 
import UserRouter from './src/controllers/user/router';
import AuthMiddleware from './src/middlewares/auth-middleware'; 

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const DB_URL = process.env.DB_URL as string;

app.use(cookieParser());
app.use(AuthMiddleware as express.RequestHandler);
app.use(cors({ 
    origin: '*',
    credentials: true 
}));
mongoose.set('strictQuery', false);

app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.static('./static'));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

const socketserver = new ws.Server({ server });

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        server.listen(PORT, () => console.log('Server started at PORT' + " " + PORT));
    } catch (error) {
        console.error(error);
    }
}

startApp();
