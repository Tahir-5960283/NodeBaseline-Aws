import express, { Express, json, Request, response, Response } from "express";
import dotenv from "dotenv";
const axios = require('axios');
require("dotenv").config();
const mongoose = require("mongoose");
const https =require('https');
mongoose.set("strictQuery", false);
import { router } from "./usersRoutes/usersRoutes";
// import { router } from "./usersRoutes/authUserRoute";
import mongoConnection from "./usersDB/usersDB";
import userModel, { User } from "./models/userModel";
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = 4500;
//................. Registered the usersRoutes ......................................//
app.use(express.json());

app.use("/user", router);
app.get("/test", (req: Request, res: Response) => {
  res.send("Hello , how i do test!");
});
mongoConnection();
// ...........server for nodejs ..........................//
app.listen(PORT, () => {
  let data = mongoConnection();
  console.log(data);
  console.log(`server is runnin on this ${PORT}`);
  console.log("TahirAbbas:5000" + " " + process.env.Database_Url);
});

