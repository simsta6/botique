import { Request, Response } from "express";
import { constructResponse } from "../interfaces";

export interface User {
  id: number,
  name: string,
  address?: string
}

export const changeUserInfo = (_request: Request, res: Response): void => {
  res.status(200).send(constructResponse("Success"));
};