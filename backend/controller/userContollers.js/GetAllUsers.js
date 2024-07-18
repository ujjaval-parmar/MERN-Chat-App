import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js";



export const getAllUsers = async(req, res, next)=>{

    try{
        
        if(!req.user._id){
            const error = (401, 'Please Log In');
            return next(error);
        }

        // console.log(req.query);
        const {searchQuery} = req.query;

        // console.log(searchQuery);

        const regex = new RegExp(searchQuery, 'i', 'g');


        const response = await UserModel.find({
            $or: [
                {name: regex},
                {email: regex}
            ]
        }).select('-password');

        
        
        res.status(200).json({
            success: true,
            message: 'Get All Users Success!',
            data: response
        })

    }catch(err){
        const error = errorHandler(500, 'Get All Users Failed!', err.message);
        next(error);
    }



}