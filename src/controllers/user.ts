import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { IItem, Item } from "../models/item";
import { items, orders } from "../data";
import { orderState, Request } from "../interfaces";
import { Role, User } from "../models/user";
import { constructResponse, idDoesNotExist, isBodyEmpty, isIdExists, isNumberPositive, isNumeric, isWrongId, sendFailResponse, ObjectId } from "../util";
import { CallbackError } from "mongoose";

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

export const postItem = async (request: Request, res: Response): Promise<void> => {
  try {
    const item: IItem = request.body;

    const {isValid, message} = isItemValid(item);
    if (!isValid) 
      throw new Error(message);
    
    const newItem = await Item.create({ ...item, seller: ObjectId(request.user.user_id) });

    res.status(201).send(constructResponse("Success", newItem));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
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
    sendFailResponse(res, 400, error.message);
  }
};

export const editItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const newItem: IItem = request.body;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }
    
    if (isNaN(itemId) || isBodyEmpty(request) || newItem.color === "")
      throw new Error();
    
    const newItemWithId = {...newItem, id: itemId};
    items.map(item => item.id === itemId && newItemWithId);

    res.status(200).send(constructResponse("Success", newItemWithId));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
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
    sendFailResponse(res, 400, error.message);
  }
};

export const getSellers = async (_request: Request, res: Response): Promise<void> => {
  try {
    const users = await User.where("role").equals(Role.SELLER);
    res.status(200).send(constructResponse("Success", users));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

const isItemValid = (item: IItem): {isValid: boolean, message: string} => {
  const { brand, color, count, size, price, imageUrl } = item;

  if (!(brand && color && count && size && price && imageUrl))
    return { isValid: false, message: "You need to fill all fields!" };

  if (!(isNumeric(count) && isNumeric(size) && isNumeric(price)))
    return { isValid: false, message: "Count, size and price should be numeric!" };

  if (!(isNumberPositive(count) && isNumberPositive(size) && isNumberPositive(price)))
    return { isValid: false, message: "Count, size and price should be numeric!"};
  
  return { isValid: true, message: "Success" };
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
      res.status(200).send(constructResponse("Success"));
    });
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
//X ADMIN END

const createToken = (user_id: string, email: string): string => {
  return jwt.sign({ user_id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
};