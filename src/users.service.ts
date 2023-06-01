import { request } from "http";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import userModel, { User } from "./models/userModel";
//.................. Now we can import the model of contact ......................//

//................. using function of create User ..........................//
export async function createUser(input: User) {
  try {
    var user = await userModel.create(input);
    return user;
  } catch (e) {
    console.error(e);
    //this is a test line
  }
}

//............................... creating a function find and update a User ...................//
export async function findAndUpdateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions<User>
) {
  try {
    var user = await userModel.findOneAndUpdate(query, update, options);
    console.log("contact:" + " " + user);
    return user;
  } catch (e) {
    console.log(e);
  }
}
//.............. creating a function of deleting the contact ...................................//
export async function findAndDeleteUser(query: FilterQuery<User>) {
  try {
    let user = await userModel.deleteOne(query);
    return user;
  } catch (error) {
    console.log(error);
  }
}
//.............. find a Contact ...................................................//
export async function findUser( query: FilterQuery<User>, options: QueryOptions = { lean: true }) {
  try {
    let user = await userModel.findById(query, {}, options);
    return user;
  } catch (error) {
    console.log(error);
  }
}
