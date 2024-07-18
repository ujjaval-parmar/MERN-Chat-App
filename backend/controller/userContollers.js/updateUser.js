
import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js"


export const updateUser = async(req, res, next)=>{
    try{

        // console.log(req.user);
        // console.log(req.body)

        if(!req.user._id){
            const error = errorHandler(401, 'You are not Authorize to Update User!');
            return next(error);
        }

        const response = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        });

        const userData = {...response._doc, password: undefined}

        res.status(200).json({
            success: true,
            message: 'Update User  Success!',
            data: userData
        })

    }catch(err){
        const error = errorHandler(500, 'Update User  Failed!', err.message);
        next(error);
    }
}