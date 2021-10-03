import { Request, Response } from "express";
import { Item } from "./item";
import { items, itemsWaitingForApproval, orders } from "../data";
import { orderState } from "./order";

interface newItem {
  label: string;
  color: string;
}

export const addItem = (request: Request, res: Response): void => {
  const item: newItem = request.body;

  if (item.label === "" || item.color === "") {
    res.status(400).send("Bad item description");
    return;
  }

  const lastIndex = Math.max(itemsWaitingForApproval.at(-1).id, items.at(-1).id);
  const addedItem: Item = {...item, id: lastIndex + 1};
  items.push(addedItem);
  res.status(200).send(addedItem);
};

export const editItem = (request: Request, res: Response): void => {
  const id = +request.params.id;
  const newItem: newItem = request.body;
  const oldItem = items.find(item => item.id === id);

  if (newItem.label === "" || newItem.color === "" || !oldItem) {
    res.status(400).send("Bad request");
    return;
  }
  const newItemWithId = {...newItem, id: id};

  items.map(item => item.id === id && newItemWithId);
  res.status(200).send(newItemWithId);
};

export const changeOrderState = (request: Request, res: Response): void => {
  const orderId = +request.params.id;
  const order = orders.find(x => x.id === orderId);
  const newOrderState: orderState = request.body;

  if (!order) {
    res.status(400).send("Bad request");
    return;
  }

  orders.forEach(x => x.id === orderId && (x.state = newOrderState));

  res.status(200).send("Order state changed successfully");
};

// export const approveOrder = (request: Request, res: Response): void => {
//   const orderId = +request.params.id;
//   const order = orders.find(x => x.id === orderId);
  
//   if (!order) {
//     res.status(400).send("Bad request");
//     return;
//   }
  
//   orders.forEach(x => x.id === orderId && (x.state = "approved"));
  
//   res.status(200).send("Order approved successfully");
// };
  
// export const cancelOrder = (request: Request, res: Response): void => {
//   const orderId = +request.params.id;
//   const order = orders.find(x => x.id === orderId);
  
//   if (!order) {
//     res.status(400).send("Bad request");
//     return;
//   }
  
//   orders.forEach(x => x.id === orderId && (x.state = "canceled"));
  
//   res.status(200).send("Order canceled successfully");
// };
  