import mongoose, { Document, Types } from "mongoose";

export enum Role {
  BUYER = "buyer",
  SELLER = "seller",
  ADMIN = "admin"
}

export interface IUser extends Document  {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  token?: string;
  role: Types.ObjectId;
}


const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6  },
  token: { type: String },
  role: {
    type: String,
    enum : Role,
    default: Role.BUYER
  },
});

export const User = mongoose.model<IUser>("user", userSchema);
