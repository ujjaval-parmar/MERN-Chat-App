import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js";

export const checkPassword = async(req, res, next)=>{

    try{

        // console.log(req.body);

        const { userId, password } = req.body;

        if(!userId){
            const error = errorHandler(422, 'Userid is Required!' );
            return next(error);
        }

        const userExists = await UserModel.findById(userId);

        if(!userExists){
            const error = errorHandler(404, 'Email is Invalid!');
            return next(error);
        }

        const hasedPassword = await bcrypt.compare(req.body.password, userExists.password);

        if(!hasedPassword){
            const error = errorHandler(400, 'Password is Invalid!');
            return next(error);
        }


        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
           user: {...userExists._doc, password: undefined}
        }, process.env.JWT_SECRET, { expiresIn: age });
        
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: age,
            SameSite: 'lax',
            // domain: "localhost",
            // secure: true
        });

        const userData = {...userExists._doc, password: undefined, token};

        res.status(200).json({
            success: true,
            message: 'Check Password Success!',
            data: userData
        })

    }catch(err){
        const error = errorHandler(500, 'Check Password Failed!', err.message);
        next(error);
    }


}