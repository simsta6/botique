import { Response } from "express";
import { Types } from "mongoose";
import { Request } from "../interfaces";
import { Chart, IItem } from "../models/chart";
import { Item } from "../models/item";
import { constructResponse, isWrongId, ObjectId, sendFailResponse } from "../util";

export const getAllItemsInChart = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemsInChart = (await(await Chart.findOne({user: (await request.user).user_id}).populate("items.item")).items);

    res.status(200).send(constructResponse("Success", itemsInChart));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const addItemToChart = async (request: Request, res: Response): Promise<void> => {
  try {
    if (await isWrongId(Item, request.params.id)) {   
      throw new Error("Wrong item id");
    }

    const count = +request.params.count;
    const itemId = ObjectId(request.params.id);
    const user = ObjectId((await request.user).user_id);
    
    const chart = await Chart.findOne({user: (await request.user).user_id});

    if (!chart) {
      const returnValue = await Chart.create({ user, items: [{ item: itemId, count: count }] });
      res.status(200).send(constructResponse("Success", returnValue));
      return;
    }
        
    const returnValue = await Chart.findByIdAndUpdate(chart._id, { items: addItemsToChart(chart.items, {item: itemId, count }) }, { new:true });

    res.status(200).send(constructResponse("Success", returnValue));

    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

const addItemsToChart = (chartItems: IItem[], item: {item: Types.ObjectId, count: number }) => {
  let isAddingNeeded = true;
  const result = chartItems.map(chartItem => {
    if (chartItem.item._id.toString() === item.item._id.toString()) {
      isAddingNeeded = false;
      return { item: chartItem.item, count: chartItem.count + item.count };
    }
    return chartItem;
  });

  const itemsRes = isAddingNeeded ? [...result, item ] : result;

  return itemsRes;
};
