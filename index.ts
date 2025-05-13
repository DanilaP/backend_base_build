const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const http = require('http');
const ws = require('ws');
const AuthRouter = require('./src/controllers/auth/router');
const cookieParser = require('cookie-parser');

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const BD_URL = `mongodb://localhost:27017/admin`;

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
