import bcrypt from "bcryptjs"
import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js";

export const register = async(req,  res, next)=>{
   
    
    try{


        const { email,  name,  password } = req.body;

        if(!email || !password || !name){
            const error = errorHandler(422, 'All Fields are Required!' );
            return next(error);
        }

        const hasedPassword = await bcrypt.hash(req.body.password, 12);

        const response = await  UserModel.create({...req.body, password: hasedPassword, profilePic: req.body.profilePic || undefined });



        const userData = {...response._doc, password: undefined, role: undefined};

        res.status(201).json({
            success: true,
            message: 'User Register Success!',
            data: userData
        })

    }catch(err){
        const message = (err.message.startsWith('E11000') ? 'Email Already Exist!' : err.message);
        
        const error = errorHandler(500, 'User Register Failed!', message);
        next(error);
    }

}