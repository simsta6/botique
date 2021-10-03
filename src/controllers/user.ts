import { Request, Response } from "express";

export interface User {
  id: number,
  name: string,
  address?: string
}

export const changeUserInfo = (_request: Request, res: Response): void => {
  res.status(200).send("Success!");
};