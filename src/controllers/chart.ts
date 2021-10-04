import { Request, Response } from "express";
import { items, chart } from "../data";
import { constructResponse, isIdExists, sendFailResponse } from "../util";

export const getAllItemsInChart = (_request: Request, res: Response): void => {
  try {

    res.status(200).send(constructResponse("Success", chart));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const addItemToChart = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;

    if (isNaN(itemId) || !isIdExists(items, itemId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
