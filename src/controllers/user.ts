import bcrypt from "bcrypt";
import { Response } from "express";
import { Request } from "../interfaces";
import { Role, User } from "../models/user";
import { constructResponse, idDoesNotExist, isBodyEmpty, isWrongId, sendFailResponse } from "../util";
import { jwrt } from "../index";
import { getToken } from "../middleware/auth";

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
    user.token = await createToken(user._id, email);
    res.cookie("token", user.token, { maxAge: 900000, httpOnly: true });

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
      user.token = await createToken(user._id, email);
      res.cookie("token", user.token, { maxAge: 900000, httpOnly: true });

      res.status(200).send(constructResponse("Success", user));
      return;
    }
    sendFailResponse(res, 400, "Invalid Credentials");
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const logout = async (request: Request, res: Response): Promise<void> => {
  try {
    const token = getToken(request);
    const jti = jwrt.decode<{jti: string}>(token).jti;

    if (!jti) {
      sendFailResponse(res, 401, "You are logged out");
      return;
    }

    jwrt.destroy(jti);
    res.status(204).send(constructResponse("Success"));
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X USER END

//SELLER

export const getSellers = async (_request: Request, res: Response): Promise<void> => {
  try {
    const users = await User.where("role").equals(Role.SELLER).select("_id first_name last_name email");
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
      idDoesNotExist(res);
      return;
    }

    const wasDeleted = await User.findById(userId).then(user => 
      user.role.toString() === Role.ADMIN ? false : (user.delete(), true));

    if (!wasDeleted)
      throw new Error("You do not have a permission!");
    
    res.status(204).send();
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getBuyersAndSellers = async (_request: Request, res: Response): Promise<void> => {
  try {
    const users = await User.where("role").in([Role.BUYER, Role.SELLER]).select("_id first_name last_name email role");
    res.status(200).send(constructResponse("Success", users));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X ADMIN END

const createToken = (user_id: string, email: string): Promise<string> => {
  return jwrt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};