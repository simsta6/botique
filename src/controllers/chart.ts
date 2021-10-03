import { Request, Response } from "express";
import { items, chart } from "../data";

export interface ChartItem {
  id: number;
  count: number
}

export const getAllItemsInChart = (_request: Request, res: Response): void => {
  res.status(200).send(chart);
};

export const addItemToChart = (request: Request, res: Response): void => {
  const id = +request.params.id;
  const item = items.find(item => item.id === id);
  
  // TODO: immutability when finished!
  chart.some(chartItem => item.id === chartItem.id) ? chart.find(chartItem => item.id === chartItem.id) :
    chart.push({id: item.id, count: 1});

  item ? res.status(200).send("Success!") : res.status(404).send(`Item with id ${id} does not exist`);
};
