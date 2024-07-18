import { errorHandler } from "../../util/error.js";

export const logout = async(req, res, next)=>{
    try {

        res.clearCookie('token');

        res.status(200).json({
            success: true,
            message: 'User has been Logout!'
        })


    } catch (err) {
        const error = errorHandler(500, "Error: can not Log out User!", err.message);
        next(error);
    }
}