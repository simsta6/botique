import { Request, Response } from "express";
import { Item } from "../models/item";
import { constructResponse, sendFailResponse } from "../util";

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

