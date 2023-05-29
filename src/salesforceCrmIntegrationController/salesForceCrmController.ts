import { User } from './../models/userModel';
const axios = require('axios');
import accessToken from "../salesforceTokenIntegration/salesforceCrmAccessTokenIntegration";
const createAccount = async () => {
  try {
    const instanceUrl = "https://orbilontechnologies.my.salesforce.com";
    // const accessToken = 'your-access-token';
    let token = await accessToken();
    console.log('retrieveTokenFromAccessToken:' + token);
    // let accessTokens =token;
    // console.log('accessTokenForIntegration:' + accessTokens);
    const url = `${instanceUrl}/services/data/v52.0/sobjects/Account`;
    const data = {
      Description: 'This is a new account.'
      // Add more fields as needed
    };

    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Process the response data
    console.log('Account created:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// createAccount();
export default createAccount;
