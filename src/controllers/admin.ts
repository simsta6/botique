import { sellers, users } from "./../data";
import { Request, Response } from "express";
import { isBodyEmpty, constructResponse, sendFailResponse, isIdExists } from "../util";
import { Seller } from "../interfaces";

export const postSeller = (request: Request, res: Response): void => {
  try {

    if (isBodyEmpty(request))
      throw new Error();

    const newSeller: Seller = request.body;
    sellers.push(newSeller);

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const deleteUser = (request: Request, res: Response): void => {
  try {
    const userId = +request.params.id;

    if (isNaN(userId) || !isIdExists(users, userId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
