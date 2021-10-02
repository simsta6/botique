import { Request, Response } from "express";
import { items } from "./data";

export interface Item {
  id: number;
  label: string;
  color: string;
}

export const getAllItems = (_request: Request, res: Response): void => {
  res.status(200).send(items);
};

export const getFiltratedItems = (request: Request, res: Response): void => {
  const color = request.params.color;
  const filtratedItems = items.filter(item => item.color.toLowerCase() === color.toLowerCase());

  res.status(200).send(filtratedItems.length ? filtratedItems : {});
};

