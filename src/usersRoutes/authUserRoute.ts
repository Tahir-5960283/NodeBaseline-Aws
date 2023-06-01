import Express, { Request, Response } from "express";
import userModel, { User } from "../models/userModel";
import { register,loginUser,getAllUsers,verifyToken,signup,signIn } from "../userscontrollers/authUserController";
//............ import controllers in the UserRoutes ...............//
import mongoConnection from "../usersDB/usersDB";
const router = Express.Router();
//..........Route for RegisterUser ...............................................//
router.post("/registerUser", register);
//............... Route for getAllUser from Database..............................//
router.get('/User',verifyToken, getAllUsers)
//......... Route for Login User .................................................//
router.post('/loginUser', loginUser);
//......... Route for new signup user .............................................//
router.post('/signup', signup);
//......... route for login .......................................................//
router.post('/login', signIn);
export { router };
