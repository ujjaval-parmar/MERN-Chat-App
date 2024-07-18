import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js";

export const checkEmail = async(req, res, next)=>{

    try{

        // console.log(req.body);

        const { email } = req.body;

        if(!email){
            const error = errorHandler(422, 'Email is Required!' );
            return next(error);
        }

        const userExists = await UserModel.findOne({email}).select('-password');

        if(!userExists){
            const error = errorHandler(404, 'Email is Invalid!');
            return next(error);
        }

        // const userData = {...userExists._doc, password: undefined};

        res.status(200).json({
            success: true,
            message: 'Check Email Success!',
            data: userExists
        })

    }catch(err){
        const error = errorHandler(500, 'Check Email Failed!', err.message);
        next(error);
    }


}