import express, { Express, json, Request, response, Response } from "express";
import dotenv from "dotenv";
var request = require("request");
require("dotenv").config();
// var cors = require('cors')
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
import { router } from "./usersRoutes/usersRoutes";
// import { router } from "./usersRoutes/authUserRoute";
// import { callingApiInNodeJs } from "./zohoCrmAPiController/zohoCrmAPiController";
import mongoConnection from "./usersDB/usersDB";
import userModel, { User } from "./models/userModel";
const app = express();
var cors = require('cors');
app.use(cors())
const PORT = 4500;
//................. Registered the usersRoutes ......................................//
app.use(express.json());
app.use("/", router);
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello , how i do test!");
});

mongoConnection();
// ...........server for nodejs ..........................//
app.listen(PORT, async () => {
  let data = mongoConnection();
  console.log('data' + await data);
  console.log(`server is runnin on this ${PORT}`);
  console.log("TahirAbbas:5000" + " " + process.env.Database_Url);
  // callingApiInNodeJs()
});

