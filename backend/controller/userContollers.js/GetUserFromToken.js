import jwt from 'jsonwebtoken';


import UserModel from "../../model/userModel.js";
import { errorHandler } from "../../util/error.js"

export const getUserFromToken = async(token)=>{

    try{

       return jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
               throw new Error(' getUserFromToken: Invalid Token!')
            }
    
            // console.log(data.user._id);
            
            const userData = await UserModel.findById(data?.user?._id);

            // console.log(userData);

            return userData;
          
    
            
        })

    }catch(err){
        console.log(err.message)
    }



}