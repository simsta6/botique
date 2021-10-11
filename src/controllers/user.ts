import { users } from "./../data";
import { Request, Response } from "express";
import { constructResponse, sendFailResponse, isIdExists, isBodyEmpty, idDoesNotExist } from "../util";

export const changeUserInfo = (request: Request, res: Response): void => {
  try {
    const userId = +request.params.id;

    if (!isIdExists(users, userId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(userId) || isBodyEmpty(request))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};