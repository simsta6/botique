import { Response } from "express";
import { IItem, Item } from "../models/item";
import { constructResponse, isNumberPositive, ObjectId, sendFailResponse } from "../util";
import { Request } from "../interfaces";

export const getAllItems = async (_request: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.find();
    res.status(200).send(constructResponse("Success", items));
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const getItem = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;

    const item = await Item.findById(itemId);

    res.status(200).send(constructResponse("Success", item));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};


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

export const deleteItem = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    
    await Item.findByIdAndDelete(itemId);

    res.status(204).send();
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const editItem = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemId = request.params.id;
    const item: IItem = request.body;

    const {isValid, message} = isItemValid(item);

    if (!isValid) 
      throw new Error(message);
    
    const updatedItem = await Item.findByIdAndUpdate(itemId, { ...item }, { new: true });

    res.status(201).send(constructResponse("Success", updatedItem));
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

const isItemValid = (item: IItem): {isValid: boolean, message: string} => {
  const { brand, color, count, size, price, imageUrl } = item;

  if (!(brand && color && count && size && price && imageUrl))
    return { isValid: false, message: "You need to fill all fields!" };

  if (!(isNumberPositive(count) && isNumberPositive(size) && isNumberPositive(price)))
    return { isValid: false, message: "Count, size and price should be numeric!"};
  
  return { isValid: true, message: "Success" };
};

