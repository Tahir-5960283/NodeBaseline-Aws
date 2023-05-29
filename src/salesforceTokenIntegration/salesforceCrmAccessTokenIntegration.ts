var axios = require("axios");
require("dotenv").config();

 const accessToken = async () => {
  const clientId ="3MVG9wt4IL4O5wvJkVX_REXl7CtkET1hm7Ad7TTdv4gVapjYnzxxvYrIj4PgjScVQ4OBTTgnoEHtXoc238Sty";
  const clientSecret ="4BABD1DF3D8803FC29668BC283E3B85E2688B1B8C9CBE95C042A916ED1A48A5B";
  const username ="salesforcecrm285-y92s@force.com";
  const password ="salesforce!!!1234";
  const securityToken ="CysCkABEecTvWWxO4yyjnAsA";
  const baseUrl ="https://login.salesforce.com";
  const tokenEndpoint = `${baseUrl}/services/oauth2/token`;
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("username", username);
  params.append("password", `${password}${securityToken}`);

  try {
    const response = await axios.post(tokenEndpoint, params);
    console.log(response)
    const accessToken = response.data.access_token;
    console.log('accessToken' + accessToken)
    return accessToken;
  } catch (error) {
    console.error("Error: " + error);
    throw error;
  }
};
// acessToken();
// console.log('accessTokenInSalesforcetokenIntegration:hghghghghgjhg' + acessToken());
export default  accessToken;





































// const getAccessToken = async function getAccessToken() {

//     try {
//       const response = await axios.post(`${process.env.loginUrl}/services/oauth2/token`, null, {
//         params: {
//           grant_type: 'password',
//           client_id: process.env.clientId,
//           client_secret:  process.env.clientSecret,
//           username: `${process.env.username}`,
//           password: `${process.env.Password}`
//         }
//       });

//       return response.data.access_token;
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       throw error;
//     }
//   }
//   getAccessToken()
//   console.log(getAccessToken())
