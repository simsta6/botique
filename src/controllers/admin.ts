import { sellers, users } from "./../data";
import { Request, Response } from "express";
import { isBodyEmpty, constructResponse, sendFailResponse, isIdExists, idDoesNotExist } from "../util";
import { Seller } from "../interfaces";

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
