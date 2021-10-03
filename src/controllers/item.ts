import { Request, Response } from "express";
import { items } from "../data";
import { constructResponse } from "../interfaces";

export interface Item {
  id: number;
  label: string;
  color: string;
}

export const getAllItems = (_request: Request, res: Response): void => {
  res.status(200).send(constructResponse("Success", items));
};

export const getItem = (request: Request, res: Response): void => {
  const id = +request.params.id;
  const item = items.find(item => item.id === id);
  
  item ? res.status(200).send(constructResponse("Success", item)) : res.status(404).send(constructResponse("Failed"));
};

export const getFiltratedItems = (request: Request, res: Response): void => {
  const color = request.params.color;
  const filtratedItems = items.filter(item => item.color.toLowerCase() === color.toLowerCase());

  res.status(200).send(constructResponse("Success", filtratedItems.length ? filtratedItems : {}));
};

