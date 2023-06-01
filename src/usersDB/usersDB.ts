import mongoose, { connect } from "mongoose";
var dbUrl = process.env.Database_Url as string;
var mongoConnection = async () => {
  console.log("dbUrl.." + " " + dbUrl);
  try {
    var connection = await connect(dbUrl);
    console.log("DbConected:::");
    return connection;
  } catch (e) {
    console.error(e);
  }
};
export default mongoConnection;