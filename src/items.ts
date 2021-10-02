import { Request, Response } from "express";

interface Item {
  label: string;
}

const items: Item[] = [
  {label: "first item"},
  {label: "first item"}
];

export const getAllItems = (_request: Request, res: Response): void => {
  res.status(200).send(items);
};
