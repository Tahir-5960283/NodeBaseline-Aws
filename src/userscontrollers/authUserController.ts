import express, { NextFunction, Request, Response } from "express";
import userModel, { User } from "../models/userModel";
import mongoose from "mongoose";
import mongoConnection from "../usersDB/usersDB";
const jwt = require("jsonwebtoken");
const jwtKey = "TH46464SH";
const bycript = require("bcrypt");
var crypto = require("crypto");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var key = "password";
var algo = "aes256";
//............ Controllers for New Register User ..................................//
const register = (req: Request, res: Response) => {
  let functionCipher = crypto.createCipher(algo, key);
  let hashedPassword = functionCipher.update(req.body.password, "utf8", "hex");
  hashedPassword += functionCipher.final("hex");
  var user = new userModel({ name: req.body.name,emailAddress: req.body.emailAddress,password: hashedPassword,});
  user.save().then((result) => {  jwt.sign( { result }, jwtKey, { expiresIn: "300s" }, (error: any, token: any) => {
          res.status(201).json({ token });
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
//............ Controllers function For Login .........................................//
const loginUser = (req: Request, res: Response) => {
  userModel.findOne({ emailAddress: req.body.emailAddress }).then((data) => {
    //........ crpto is a package change the encrypted form of password in decrypted  ............//
    var decipher = crypto.createDecipher(algo, key);
    var decrypted = decipher.update(data?.password, "hex", "utf8") + decipher.final("utf8");
    if (decrypted == req.body.password) {
      jwt.sign({ data }, jwtKey, { expiresIn: "300s" },(error:any,token:any) => {
        res.status(200).json({token});
      });
    }
  });
};
//.......... Controller for signup ........................................................//
const signup = async (req:Request,res:Response) => {
 console.log('requestedFromBody:' + ' ' + req.body);
 const user:User= req.body;
  try {
  //...... First we check that User Already exist or not ,If User already Exit return in response user Already present...//
   const existingUser = await userModel.findOne({emailAddress:user.emailAddress});
//..... if User is Already Existed in Database ...................................//
   if (existingUser) {
   return res.status(400).json({message:'User Already Exist In DataBase'})
   }

   const hashedPassword = await bycript.hash(user.password,10);
   //......... Create a New User  in DataBase .......................................................//
   const result:User = await userModel.create({
    name:user.name,
    emailAddress:user.emailAddress,
    password:hashedPassword });
    //........... If New User signup ,After signup it will return a Token ..........................//
    const token = jwt.sign({emailAddress:result.emailAddress,id:result.id},{expressIn:'300s'},jwtKey);
    //... when we requested with the user,name,emailAddress,password,in response it will return all User Data And Token..//
    res.status(201).json({user:result,Token:token});
  } catch (error) {
   console.log(error);
   res.status(500).json({message:'SomeThing Went Wrong'});
  }
 
}
//.......... Controller  for signIn .......................................................//
const signIn = async (req:Request,res:Response) => {
  const user:User =req.body;
  console.log('requestedUserFromBody:' + ' ' + user);
  try {
   const existingUser = await userModel.findOne({emailAddress:user.emailAddress});
   if(!existingUser) {
    return res.status(500).json({message:'User Does Not Exist in DataBase'});
   }
   const matchPassword = await  bycript.compare(user.password,existingUser.password);
   //... Now we check that password does not match then ,it will return in response invalid Credentials..//
   if(!matchPassword){
    return res.status(400).json({message:'Invalid Credentials'});
   }
   const token = jwt.sign({emailAddress:user.emailAddress,id:user.id},{expressIn:'300s'},jwtKey);
   res.status(201).json({user:existingUser,token:token});
  } catch(error){
    console.log(error);
  }
}
//........... controller for getAllUser From Database .....................................//
const getAllUsers = async (req:Request, res:Response) => {
  try {
    const user = await userModel.find();
    console.log('user' + ' ' + user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const bearerToken = req.headers['authorization'];
   console.log('bearerToken:' + ' ' + bearerToken);
   const extractBearerToken =bearerToken?.split(' ')[1];
   console.log('extractBearerToken:' + ' ' + extractBearerToken);
  if(extractBearerToken) {
        //........verify Token Request .......................................//
       let token =extractBearerToken;
       console.log('token:' + ' ' + token);
      try{
          const validToken = jwt.verify(token,jwtKey);
          console.log("validToken" + ' ' + validToken);
          if(validToken){
              console.log("validToken" + ' ' + validToken);
              return next();
          }
      }catch (err) {
          return res.json({error: err});
      }
  }else{
      return res.json({error: "User not authenticated"});
  }
}
export { register, loginUser,getAllUsers,verifyToken,signup,signIn};


