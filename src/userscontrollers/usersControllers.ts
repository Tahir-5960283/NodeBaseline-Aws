import express, { Request, Response } from "express";
import userModel, { User } from "../models/userModel";
import dotenv from "dotenv";
const axios = require('axios');
require("dotenv").config();
import mongoose from "mongoose";
import mongoConnection from "../usersDB/usersDB";
import { request } from "http";
import {
  findUser,
  findAndDeleteUser,
  findAndUpdateUser,
  createUser,
} from "../users.service";
var createRecordZohoApi_Url =process.env.creatRecordZohoApi_Url;
//............. create All Record in Zoho ......................................//

//............... Controllers for create a New User ...........................//
const readAllDataFromDB = async (req: Request, res: Response) => {
  let readAllDataFromDB = await userModel.find({});
  console.log(readAllDataFromDB);
  res.json({ readAllDataFromDB: readAllDataFromDB });
};
// ........ callingApiControllers in Nodejs....................................
const callingApiInNodejs = async (req: Request, res: Response) => {
  try {
    var rp = require("request-promise-native");
    var options = {
      apiUlr: "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
      json: true,
    };

    var response = await rp(options);
    return response;
  } catch (error) {
    throw error;
  }
};
//............ Controllers for CreateNewUser ................................//
const createNewUser = async (req: Request, res: Response) => {
  try {
    let connection = await mongoConnection();
    var requestCreateNewUser: User = req.body;
    console.log("requestCreateNewUser:" + " " + requestCreateNewUser);
    const NewUser = await createUser(requestCreateNewUser);
    console.log("createNewUser:" + " " + NewUser);
    if(NewUser){
      console.log('newUserBeforeInsertInZoho:' + ' ' + NewUser);
      axios.post('https://www.zohoapis.com/crm/v2/Leads', {
       role:NewUser.id,first_name:NewUser.firstName,email:NewUser.emailAddress,profile:NewUser.id,last_name:NewUser.lastName
      })
      .then((res) => {
          console.log('resZohoRecordApi' + ' '+ res);
          // console.log('resZohoRecordApi' + ' '+ res.data);
      }).catch((err) => {
          console.error(err);
      });
    }
    res.status(200).json(NewUser);
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
  // callingApiInNodejs
};
