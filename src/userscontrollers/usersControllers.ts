import express, { Request, Response } from "express";
import userModel, { User } from "../models/userModel";
import dotenv from "dotenv";
require("dotenv").config();
var axios = require("axios");
import accessToken from "../salesforceTokenIntegration/salesforceCrmAccessTokenIntegration";
// console.log('toke:' + token.token)
import { CrmUserData } from "../crm models/crmUsers";
import mongoose from "mongoose";
import mongoConnection from "../usersDB/usersDB";
import {
  findUser,
  findAndDeleteUser,
  findAndUpdateUser,
  createUser,
} from "../users.service";
import console from "console";
import { type } from "os";
//............... Controllers for create a New User ...........................//
const readAllDataFromDB = async (req: Request, res: Response) => {
  let readAllDataFromDB = await userModel.find({});
  console.log(readAllDataFromDB);
  res.json({ readAllDataFromDB: readAllDataFromDB });
};
//............ Controllers for CreateNewUser ................................//
const createNewUser = async (req: Request, res: Response) => {
  try {
    let connection = await mongoConnection();
    var requestCreateNewUser: User = req.body;
    console.log("requestCreateNewUser:" + " " + requestCreateNewUser);
    let NewUser = await createUser(requestCreateNewUser);
    console.log("createNewUser:" + " " + NewUser);
    res.status(200).json(NewUser);
    //  ...... post api request for salesforce crm ...............................................
    // if (NewUser !== null) {
    //   let token = await accessToken();
    //   console.log("retrieveTokenFromAccessToken:" + token);
    //   let accessTokens = token;
    //   console.log("accessTokenForIntegration:" + accessTokens);
    //   const url =
    //     "https://orbilon.my.salesforce.com/services/data/v57.0/sobjects/Account";
    //   const data = {
    //     Name: NewUser?.firstName,
    //   };
    //   const response = await axios.post(url, data, {
    //       headers: {
    //         Authorization: `Bearer ${accessTokens}`,
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    //     })
    //     .then(function (response: any) {
    //       console.log(response);
    //     })
    //     .catch(function (error: any) {
    //       console.error(error);
    //     });
    //   //................... proccess the response data ..............................//
    // }
    //...............End The Post Api request for salesforce crm..........................//
    // Post Api request for Zoho Crm ...................................................//
    // if (NewUser !== null) {
    //   var requestData = {
    //     data: [
    //       {
    //         First_Name: NewUser?.firstName,
    //         Last_Name: NewUser?.lastName,
    //         Company: NewUser?.company,
    //         Lead_Status: NewUser?.leadStatus,
    //         Email: NewUser?.emailAddress,
    //       },
    //     ],
    //   };
    //   var body = JSON.stringify(requestData);
    //   let axiosConfig = {
    //     headers: {
    //       "Content-Type": "application/json;charset=UTF-8",
    //       Authorization:JSON.stringify('access_Token'),
    //     },
    //   };
    //   const response = await axios
    //     .post("https://www.zohoapis.com/crm/v2/Leads", body, axiosConfig)
    //     .then(function (response: any) {
    //       console.log(response);
    //     })
    //     .catch(function (error: any) {
    //       console.log(error);
    //     });
    // }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
//................... Controllers  for getAllUsersById ............................//
const getUsersById = async (req: Request, res: Response) => {
  // console.log(request.params._id);
  try {
    let connection = await mongoConnection();
    var requestReadUser: User = req.body;
    console.log("requestReadUser" + " " + requestReadUser);
    let requestReadUserById = await findUser({ _id: req.params._id });
    console.log("requestReadUserUpdate:" + " " + requestReadUserById);
    res.status(201).json(requestReadUserById);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//.............. controllers for Update Existing Users ................................//
const updateUsers = async (req: Request, res: Response) => {
  try {
    let connection = await mongoConnection();
    var requestUpdateContact: User = req.body;
    console.log("requestUpdateContact:" + " " + requestUpdateContact);
    // let requestContactUpdate = await findAndUpdateContact( { emailAddress: request.body.emailAddress }, { $set: { fullName: request.body.fullName } }, { new: true });
    let requestContactUpdate = await findAndUpdateUser(
      { _id: req.params._id },
      { $set: req.body },
      { upsert: true, returnNewDocument: true }
    );
    console.log("requestContactUpdateResponse:" + " " + requestContactUpdate);
    res.status(201).json(requestContactUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//........... Controllers for Delete User ........................................................//
const deleteUser = async (req: Request, res: Response) => {
  try {
    let connection = await mongoConnection();
    var requestDeleteUser: User = req.body;
    console.log("requestDeleteUser:" + " " + requestDeleteUser);
    let requestUserDelete = await findAndDeleteUser({ _id: req.params._id });
    console.log("requestUserUpdate:" + " " + requestUserDelete);
    res.status(200).json(requestUserDelete);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//................... Export All Controllers ..................................//
export {
  createNewUser,
  getUsersById,
  updateUsers,
  readAllDataFromDB,
  deleteUser,
};
