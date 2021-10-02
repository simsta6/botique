import { Request, Response } from "express";
import { chart } from "./data";

export const makeAnOrder = (request: Request, res: Response): void => {
  const isValidAddress = true;

  chart.length && isValidAddress ? res.status(200).send("Success!") : res.status(404).send("Can't make an order");
};
