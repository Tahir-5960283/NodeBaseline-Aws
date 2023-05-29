const axios = require('axios');
import { User } from "../models/userModel";
var NewUser:User;
const crmApiPostData = async () => {
  var requestData = {
    data: [
      {
        First_Name: NewUser?.firstName,
        Last_Name: NewUser?.lastName,
        Company: NewUser?.company,
        Lead_Status: NewUser?.leadStatus,
        Email: NewUser?.emailAddress,
      },
    ],
  };
  var body = JSON.stringify(requestData);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization:
        "Zoho-oauthtoken 1000.3c585af9aef68cbf9f26c9d0fc150ee4.0b719f11b02fe05ab61a552872dc6ac2",
    },
  };
  try {
    const  data  = await axios.post("https://www.zohoapis.com/crm/v2/Leads",body,axiosConfig);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
// crmApiPostData();
export {
  crmApiPostData
}


