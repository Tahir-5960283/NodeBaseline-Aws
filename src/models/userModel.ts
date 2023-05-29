import { Schema, model } from "mongoose";
// ................... creating interface of Contact ...................................
export interface User {
  firstName:string;
  lastName:string;
  id: string;
  name: string;
  emailAddress: string;
  createdDate: Date;
  phoneNumber: string;
  company: string;
  leadStatus:string;
  isActive: boolean;
  ModifiedDate: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorAuthenticationEnabled: boolean;
  password: string;
}
//........................ creating contact schema .....................................//
const userSchema = new Schema<User>({
  id: { type: String, required: false },
  name: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  company: { type: String, required: false },
  emailAddress: { type: String, required: false },
  createdDate: { type: Date, required: false },
  isActive: { type: Boolean, required: false },
  ModifiedDate: { type: Date, required: false },
  leadStatus:{type:String, required:false},
  phoneVerified: { type: Boolean, required: false, default: false },
  emailVerified: { type: Boolean, required: false, default: false },
  twoFactorAuthenticationEnabled: { type: Boolean, default: false },
  password: { type: String, required: true },
});
// connect model with schema , then we export it using in another file
const userModel = model<User>("users", userSchema);
export default userModel;
