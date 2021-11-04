import mongoose from "mongoose";

export enum Role {
  BUYER = "buyer",
  SELLER = "seller",
  ADMIN = "admin"
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6, select: false  },
  token: { type: String },
  role: {
    type: String,
    enum : Role,
    default: Role.BUYER
  },
});

export const User = mongoose.model("user", userSchema);
