import { Request, Response } from "express";
import { Seller } from "./seller";
import { constructResponse } from "../interfaces";

export const addSeller = (request: Request, res: Response): void => {
  const newSeller: Seller = request.body;

  const created = true;

  created ? res.status(200).send(constructResponse("Success")) : res.status(400).send(constructResponse("Failed"));
};

export const deleteUser = (request: Request, res: Response): void => {
  const userId = +request.params.id;

  const deleted = true;

  deleted ? res.status(200).send(constructResponse("Success")) : res.status(400).send(constructResponse("Failed"));
};