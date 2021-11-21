import { Request as R } from "express";

export interface IUser extends Express.User {
  user_id?: string;
  jti?: string;
  email?: string;
}

export interface Request extends R {
  user?: IUser;
}
