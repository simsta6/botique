import { sellers } from "./../data";
import { Request, Response } from "express";
import { orderState } from "../interfaces";
import { items, orders } from "../data";
import { constructResponse, idDoesNotExist, isBodyEmpty, isIdExists, sendFailResponse } from "../util";

interface newItem {
  label: string;
  color: string;
}


export const postItem = (request: Request, res: Response): void => {
  try {
    const item: newItem = request.body;

    if (isBodyEmpty(request) || item.label === "" || item.color === "")
      throw new Error();

    res.status(200).send(constructResponse("Success", item));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const deleteItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }

    if (isNaN(itemId))
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const editItem = (request: Request, res: Response): void => {
  try {
    const itemId = +request.params.id;
    const newItem: newItem = request.body;

    if (!isIdExists(items, itemId)) {
      idDoesNotExist(res);
      return;
    }
    
    if (isNaN(itemId) || isBodyEmpty(request) || newItem.label === "" || newItem.color === "")
      throw new Error();
    
    const newItemWithId = {...newItem, id: itemId};
    items.map(item => item.id === itemId && newItemWithId);

    res.status(200).send(constructResponse("Success", newItemWithId));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const changeOrderState = (request: Request, res: Response): void => { 
  try {
    const orderId = +request.params.id;

    if (!isIdExists(orders, orderId)) {
      idDoesNotExist(res);
      return;
    }
    
    if (isNaN(orderId) || isBodyEmpty(request))
      throw new Error();
    
    const newOrderState: orderState = request.body;

    orders.forEach(x => x.id === orderId && (x.state = newOrderState));

    res.status(200).send(constructResponse("Success"));

  } catch (error) {
    sendFailResponse(res, error.message);
  }
};

export const getSellers = (_request: Request, res: Response): void => {
  try {
    
    res.status(200).send(constructResponse("Success", sellers));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
