import express, { Express, json, Request, response, Response } from "express";
import dotenv from "dotenv";
require("dotenv").config();

const mongoose = require("mongoose");
const zohoCrmSdk = require("zcrmsdk");

const https = require("https");
mongoose.set("strictQuery", false);
import mongoConnection from "./usersDB/usersDB";
import { router } from "./usersRoutes/usersRoutes";
const app = express();
const PORT = 4500;
//................. Registered the usersRoutes ......................................//
app.use(express.json());
// app.use("/", router);
app.get("/search", (req: Request, res: Response) => {
  https
    .get("https://creator.zoho.com/api/v2/abbastahir105/employee-management/report/Employee_Details", (res) => {
      let data = "";
      // A chunk of data has been received.
      res.on("data", (chunk) => {
        console.log("chunk:" + " " + chunk);
        console.log("dataaaa:" + " " + data);
        data += chunk;
        console.log("chunk:" + " " + chunk);
      });
      // The whole response has been received. Print out the result.
      res.on("end", () => {
        console.log("NodejsCallingApiData:" + JSON.parse(data).explanation);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});
//............  use Lead Api in nodejs .................................. //

mongoConnection();
// ...........server for nodejs ..........................//
app.listen(PORT, () => {
  let data = mongoConnection();
  console.log(data);
  console.log(`server is runnin on this ${PORT}`);
  console.log("TahirAbbas:5000" + " " + process.env.Database_Url);
});
