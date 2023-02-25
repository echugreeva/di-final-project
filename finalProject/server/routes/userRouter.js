import express from "express";
import { _register, _login, logout, _login2} from "../controllers/Users.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";


const userRouter = express.Router();

userRouter.post('/register', _register);
userRouter.post('/login', _login2);

userRouter.get('/token', VerifyToken, (req, res)=>{
    res.sendStatus(200)
});

// router.get('/admin',VerifyToken, getUsers);
userRouter.delete('/logout', logout)
// router.get('/token', VerifyToken, (req, res)=>{
//     res.sendStatus(200)
// })

export default userRouter