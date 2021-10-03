import { Request, Response } from "express";
import { constructResponse } from "../interfaces";

export interface User {
  id: number,
  name: string,
  address?: string
}

export const changeUserInfo = (request: Request, res: Response): void => {
  const userId = +request.params.id;

  res.status(200).send(constructResponse("Success"));
};