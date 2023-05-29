import express, { Express, json, Request, response, Response } from "express";
import dotenv from "dotenv";
require("dotenv").config();
const zohoCrmSdk = require("zcrmsdk");
const https = require("https");
const app = express();
const PORT = 4500;
//................. Registered the usersRoutes ......................................//
app.use(express.json());
const cofigJson = {
  client_id: process.env.client_Id,
  client_secret: process.env.client_Secret,
  client_emailAddress: process.env.email_Address,
  redirect_url: "http://localhost:4500",
  base_url: "www.zohoapis.com",
  iam_url: "accounts.zoho.com",
  token_management: `${__dirname}/tokenManagement.ts`,
};

async function initialiseClinet() {
    await zohoCrmSdk.initialize(cofigJson);
}
async function bootsrapOauthFromSelfClient() {
  await initialiseClinet();

}
app.get("/search", (req: Request, res: Response) => {
  https
    .get(
      "https://creator.zoho.com/api/v2/abbastahir105/employee-management/report/Employee_Details",
      (res) => {
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
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});
//............  use Lead Api in nodejs .................................. //
// ...........server for nodejs ..........................//
app.listen(PORT, () => {
  console.log(`server is runnin on this ${PORT}`);
  console.log("TahirAbbas:5000" + " " + process.env.Database_Url);
});


