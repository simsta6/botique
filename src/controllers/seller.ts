import { Request, Response } from "express";
import { Item } from "./item";
import { items, itemsWaitingForApproval, orders } from "../data";
import { orderState } from "./order";
import { User } from "./user";
import { constructResponse } from "../interfaces";

interface newItem {
  label: string;
  color: string;
}

export interface Seller extends User {
  shopName: string,
  rating: number
}

interface Shop {
  address: string,
  workingHours: string
}


export const addItem = (request: Request, res: Response): void => {
  const item: newItem = request.body;

  if (item.label === "" || item.color === "") {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  const lastIndex = Math.max(itemsWaitingForApproval.at(-1).id, items.at(-1).id);
  const addedItem: Item = {...item, id: lastIndex + 1};
  items.push(addedItem);
  res.status(200).send(constructResponse("Success", addedItem));
};

export const deleteItem = (request: Request, res: Response): void => {
  const id = +request.params.id;

  const isItemExists = items.some(item => item.id === id);

  if (!isItemExists) {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  res.status(200).send(constructResponse("Success"));
};

export const editItem = (request: Request, res: Response): void => {
  const id = +request.params.id;
  const newItem: newItem = request.body;
  const oldItem = items.find(item => item.id === id);

  if (newItem.label === "" || newItem.color === "" || !oldItem) {
    res.status(400).send(constructResponse("Failed"));
    return;
  }
  const newItemWithId = {...newItem, id: id};

  items.map(item => item.id === id && newItemWithId);
  res.status(200).send(constructResponse("Success", newItemWithId));
};

export const changeOrderState = (request: Request, res: Response): void => {
  const orderId = +request.params.id;
  const order = orders.find(x => x.id === orderId);
  const newOrderState: orderState = request.body;

  if (!order) {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  orders.forEach(x => x.id === orderId && (x.state = newOrderState));

  res.status(200).send(constructResponse("Success"));
};

export const addShop = (request: Request, res: Response): void => {
  const shop: Shop = request.body;

  if (shop.address === "" || shop.workingHours === "") {
    res.status(400).send(constructResponse("Failed"));
    return;
  }

  res.status(200).send(constructResponse("Success"));
};
  