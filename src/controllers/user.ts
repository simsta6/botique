import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user";
import { constructResponse, idDoesNotExist, isBodyEmpty, isIdExists, sendFailResponse } from "../util";
import { users } from "./../data";

export const changeUserInfo = (request: Request, res: Response): void => {
  try {
    const userId = +request.params.id;

    if (!isIdExists(users, userId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(userId) || isBodyEmpty(request))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const register = async (request: Request, res: Response): Promise<void> => {
  try {
    if (isBodyEmpty(request))
      throw new Error();

    const { first_name, last_name, email, password } = request.body;

    if (!(email && password && first_name && last_name)) {
      sendFailResponse(res, 400, "All input is required");
      return;
    }

    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      sendFailResponse(res, 409, "User Already Exist. Please Login");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    user.token = createToken(user._id, email);

    res.status(201).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
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

    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = createToken(user._id, email);

      res.status(200).json(user);
    }
    sendFailResponse(res, 400, "Invalid Credentials");
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

const createToken = (user_id: string, email: string): string => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};