import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { CallbackError } from "mongoose";
import { Request } from "../interfaces";
import { Role, User } from "../models/user";
import { constructResponse, isBodyEmpty, isWrongId, sendFailResponse } from "../util";

//USER
export const register = async (request: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = request.body;

    if (!(email && password && first_name && last_name)) {
      sendFailResponse(res, 400, "All input is required");
      return;
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      sendFailResponse(res, 409, "User Already Exist. Please Login");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    user.token = createToken(user._id, email);

    res.status(201).send(constructResponse("Success", user));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const login = async (request: Request, res: Response): Promise<void> => {
  try {
    if (isBodyEmpty(request))
      throw new Error();

    const { email, password } = request.body;

    if (!(email && password)) {
      sendFailResponse(res, 400, "All input is required");
      return;
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = createToken(user._id, email);

      res.status(200).send(constructResponse("Success", user));
      return;
    }
    sendFailResponse(res, 400, "Invalid Credentials");
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X USER END

//SELLER

export const getSellers = async (_request: Request, res: Response): Promise<void> => {
  try {
    const users = await User.where("role").equals(Role.SELLER);
    res.status(200).send(constructResponse("Success", users));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X SELLER END

// ADMIN
export const postSeller = async (request: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = request.body;

    if (!(email && password && first_name && last_name)) {
      sendFailResponse(res, 400, "All input is required");
      return;
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      sendFailResponse(res, 409, "Seller Already Exist. Please use different email");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: Role.SELLER,
    });

    res.status(201).send(constructResponse("Success", user));
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const deleteUser = async (request: Request, res: Response): Promise<void> => {
  try {
    const userId = request.params.id;

    if (await isWrongId(User, userId)) {   
      throw new Error("Wrong item id");
    }

    User.findByIdAndRemove(userId, (err: CallbackError) => {
      if (err) {
        throw new Error(err.message);
      }
      res.status(204).send();
    });
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X ADMIN END

const createToken = (user_id: string, email: string): string => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};