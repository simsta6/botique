import { Request, Response } from "express";
import { items } from "../data";
import { constructResponse, idDoesNotExist, isIdExists, sendFailResponse } from "../util";

export const getAllItems = (_request: Request, res: Response): void => {
  try {

    res.status(200).send(constructResponse("Success", items));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(itemId))
      throw new Error();

    const item = items.find(item => item.id === itemId);

    res.status(200).send(constructResponse("Success", item));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

