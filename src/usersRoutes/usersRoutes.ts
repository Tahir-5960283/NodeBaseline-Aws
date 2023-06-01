import Express, { Request, Response } from "express";
import userModel, { User } from "../models/userModel";
//............ import controllers in the UserRoutes ...............//
import {readAllDataFromDB,createNewUser,getUsersById,updateUsers,deleteUser} from "../userscontrollers/usersControllers";
import mongoConnection from "../usersDB/usersDB";
const router = Express.Router();
router.get("/readAll", readAllDataFromDB);
router.post("/createNewUser", createNewUser);
router.get("/findAllUser/:_id", getUsersById);
router.put('/updateUser', updateUsers);
router.delete('/deleteUser/:_id', deleteUser);
// router.get('/nodeAPi', callingApiInNodejs);
export { router };
