import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { IOrder } from "../models/order";
import { IUser, Request } from "../interfaces";
import { IItem } from "../models/item";
import { Role, User } from "../models/user";
import { isWrongId, sendFailResponse } from "../util";
import { jwrt } from "../index";

export const verifyToken = async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = getToken(request);

    if (!token) {
      sendFailResponse(res, 403, "A token is required for authentication");
      return;
    }

    const decoded = await jwrt.verify(token, process.env.TOKEN_KEY);
    request.user = decoded as IUser;
    return next();
  } catch (err) {
    if (err.name === "TokenDestroyedError") {
      sendFailResponse(res, 401, "Token Destroyed");
      return;
    }
    sendFailResponse(res, 401, "Invalid Token");
  }
};

const getToken = (request: Request): string => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  return token;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const verifyIsSellersModel = (model: Model<IItem | IOrder, {}, {}, {}>) =>
  async (request: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemId = request.params.id;

      if (await isWrongId(model, itemId)) {   
        throw new Error("Wrong item id");
      }

      const item = await model.findById(request.params.id);
      const itemSellerID = item.seller.toString();
      const sellersID = (await request.user).user_id;

      if (sellersID !== itemSellerID){
        sendFailResponse(res, 401, "You do not have a permission!");
        return;
      }

      return next();
    } catch (err) {
      sendFailResponse(res, 400, err.message);
    }
  };

export const verifyIsSeller = async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isSeller = await verifyRole(request, res, Role.SELLER);
    if (!isSeller){
      sendFailResponse(res, 401, "You do not have a permission!");
      return;
    }

    return next();
  } catch (err) {
    sendFailResponse(res, 400, err.message);
  }
};

export const verifyIsAdmin = async (request: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const isAdmin = await verifyRole(request, res, Role.ADMIN);
    if (!isAdmin){
      sendFailResponse(res, 401, "You do not have a permission!");
      return;
    }

    return next();
  } catch (err) {
    sendFailResponse(res, 400, err.message);
  }
};

const verifyRole = async (request: Request, res: Response, role: Role): Promise<boolean> => {
  try {
    const gottenRole = (await User.findById((await request.user).user_id )).role.toString() ;
    const isAdmin = gottenRole === role;
    return isAdmin;
  } catch (err) {
    sendFailResponse(res, 400, err.message);
  }
};
