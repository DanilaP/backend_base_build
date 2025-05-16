import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import http from 'http';
import ws from 'ws';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRouter from './src/controllers/auth/router'; 
import UserRouter from './src/controllers/users/router';
import AuthMiddleware from './src/middlewares/auth-middleware'; 

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const BD_URL = `mongodb://localhost:27017/admin`;

app.use(AuthMiddleware as express.RequestHandler);
app.use(cookieParser());
app.use(cors({ 
    origin: '*',
    credentials: true 
}));
mongoose.set('strictQuery', false);

app.use(fileUpload());
app.use(express.json());
app.use(express.static('./src/static'));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

const socketserver = new ws.Server({ server });

async function startApp() {
    try {
        await mongoose.connect(BD_URL);
        server.listen(PORT, () => console.log('Server started at PORT' + " " + PORT));
    } catch (error) {
        console.error(error);
    }
}

startApp();
