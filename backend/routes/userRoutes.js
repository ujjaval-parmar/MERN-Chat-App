import { Router } from 'express';
import { register } from '../controller/userContollers.js/register.js';
import { checkEmail } from '../controller/userContollers.js/checkEmail.js';
import { checkPassword } from '../controller/userContollers.js/checkPassword.js';
import { userDeatils } from '../controller/userContollers.js/userDetail.js';
import { verifyToken } from '../util/verifyToken.js';
import { logout } from '../controller/userContollers.js/logout.js';
import { updateUser } from '../controller/userContollers.js/updateUser.js';
import { getAllUsers } from '../controller/userContollers.js/GetAllUsers.js';


const userRouter = Router();


userRouter.post('/register', register);
userRouter.post('/check-email', checkEmail);
userRouter.post('/check-password', checkPassword);


userRouter.get('/all-users', verifyToken, getAllUsers);
userRouter.get('/user-detail', verifyToken, userDeatils);
userRouter.put('/user-update', verifyToken, updateUser);
userRouter.get('/user-logout', verifyToken, logout);


export default userRouter;