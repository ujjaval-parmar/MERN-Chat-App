import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) =>{
    // console.log(req.cookies.token);

    const token = req.cookies.token;

    if (!token) {
        const error = errorHandler(403, 'Please Login!')
        return next(error);
    };

    // console.log(process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            const error = (403, 'Please Login Again!', err.message);
            return next(error);
        }

        // console.log(data);
        req.user = {
           ...data.user
        }

        next();
    })

    
}
