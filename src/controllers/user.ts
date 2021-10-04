import { users } from "./../data";
import { Request, Response } from "express";
import { constructResponse, sendFailResponse, isIdExists, isBodyEmpty } from "../util";

export const changeUserInfo = (request: Request, res: Response): void => {
  try {
    const userId = +request.params.id;

    if (isNaN(userId) || !isIdExists(users, userId) || isBodyEmpty(request))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};