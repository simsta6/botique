import { Request, Response } from "express";
import { chart } from "../data";
import { ChartItem } from "./chart";

export type orderState = "pending" | "paid" | "approved" | "finished" | "canceled";

export interface Order {
  id: number;
  address: string;
  items: ChartItem[];
  sellerId: number;
  state: orderState;
}

export const makeAnOrder = (request: Request, res: Response): void => {
  const isValidAddress = true;

  chart.length && isValidAddress ? res.status(200).send("Success!") : res.status(404).send("Can't make an order");
};
