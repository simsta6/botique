import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { items, orders } from "../data";
import { orderState, Seller } from "../interfaces";
import { User } from "../models/user";
import { constructResponse, idDoesNotExist, isBodyEmpty, isIdExists, sendFailResponse } from "../util";
import { sellers, users } from "./../data";

//USER
export const register = async (request: Request, res: Response): Promise<void> => {
  try {
    if (isBodyEmpty(request))
      throw new Error();

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

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = createToken(user._id, email);

      res.status(200).send(constructResponse("Success", user));
      return;
    }
    sendFailResponse(res, 400, "Invalid Credentials");
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
//X USER END

//SELLER
interface newItem {
  label: string;
  color: string;
}

export const postItem = (request: Request, res: Response): void => {
  try {
    const item: newItem = request.body;

    if (isBodyEmpty(request) || item.label === "" || item.color === "")
      throw new Error();

    res.status(201).send(constructResponse("Success", item));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const deleteItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(itemId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const editItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const newItem: newItem = request.body;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }
    
    if (isNaN(itemId) || isBodyEmpty(request) || newItem.label === "" || newItem.color === "")
      throw new Error();
    
    const newItemWithId = {...newItem, id: itemId};
    items.map(item => item.id === itemId && newItemWithId);

    res.status(200).send(constructResponse("Success", newItemWithId));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const changeOrderState = (request: Request, res: Response): void => { 
  try {
    const orderId = +request.params.id;

    if (!isIdExists(orders, orderId)) {
      idDoesNotExist(res);
      return;
    }
    
    if (isNaN(orderId) || isBodyEmpty(request))
      throw new Error();
    
    const newOrderState: orderState = request.body;

    orders.forEach(x => x.id === orderId && (x.state = newOrderState));

    res.status(200).send(constructResponse("Success"));

  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getSellers = (_request: Request, res: Response): void => {
  try {
    
    res.status(200).send(constructResponse("Success", sellers));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
//X SELLER END

// ADMIN
export const postSeller = (request: Request, res: Response): void => {
  try {

    if (isBodyEmpty(request))
      throw new Error();

    const newSeller: Seller = request.body;
    sellers.push(newSeller);

    res.status(201).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const deleteUser = (request: Request, res: Response): void => {
  try {
    const userId = +request.params.id;

    if (!isIdExists(users, userId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(userId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
//X ADMIN END

const createToken = (user_id: string, email: string): string => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};