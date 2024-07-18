import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './util/error.js';
import { connectDB } from './config/connectDB.js';
import userRouter from './routes/userRoutes.js';
import {app, server } from './socket/index.js';


// dotenv.config();


// const app = express();

app.use(express.json({ limit: '50mb' }));

// app.use(express.bodyParser({limit: '50mb'}));


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);

    next();
});

app.use(cookieParser());

app.use('/api', userRouter);


app.use('*', (req, res, next) => {

    const error = errorHandler(404, 'Not Found ' + req.originalUrl + ' on this server!')

    next(error);

});


app.use((err, req, res, next) => {
    // console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    const error = err.error || undefined;

    console.log(err);

    res.status(statusCode).json({
        success: false,
        message,
        error
    })

})


connectDB()
    .then(() => {
        server.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        })
    })
    .catch(err => console.log(err));

