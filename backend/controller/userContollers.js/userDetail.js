

import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js"

export const userDeatils = async(req, res, next)=>{

    try{

        

        // const response = await UserModel.findById(req.user.id);

        if(!req.user || !Object.keys(req.user).length){
            const error = errorHandler(404, 'User not Found!');
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Get User Details Success!',
            data: req.user
        })

    }catch(err){
        const error = errorHandler(500, 'Get User Deatils Failed!', err.message);
        next(error);
    }



}