import { Request, Response } from "express";
import { Item } from "./item";
import { items, itemsWaitingForApproval } from "./data";

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
