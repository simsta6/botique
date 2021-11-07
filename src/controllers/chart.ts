import { Response } from "express";
import { CallbackError, Types } from "mongoose";
import { Request } from "../interfaces";
import { Chart, IChart } from "../models/chart";
import { Item } from "../models/item";
import { constructResponse, isWrongId, sendFailResponse } from "../util";

const ObjectId = (id: string) => new Types.ObjectId(id);

export const getAllItemsInChart = async (request: Request, res: Response): Promise<void> => {
  try {
    const itemsInChart = (await(await Chart.findOne({user: request.user.user_id}).populate("items.item")).items);

    res.status(200).send(constructResponse("Success", itemsInChart));
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

// TODO: fix bug when addding multiple items with two different ids
// gal sutaisyta,
export const addItemToChart = async (request: Request, res: Response): Promise<void> => {
  try {
    if (await isWrongId(Item, request.params.id)) {   
      throw new Error("Wrong item id");
    }

    const count = +request.params.count;
    const itemId = ObjectId(request.params.id);
    const user = ObjectId(request.user.user_id);

    Chart.findOne({user: request.user.user_id}, (err: CallbackError, chart: IChart) => {
      if (err) {
        throw new Error(err.message);
      }

      if (chart) {
        const doestChartIncludesItem = chart.items.some(x => { 
          const result = x.item.toString() === itemId.toString();
          return result;
        });

        const items = doestChartIncludesItem ?
          chart.items.map(x => x.item.toString() === itemId.toString() ? { item: itemId, count: x.count + count} : { item: itemId, count }) 
          : [...chart.items, { item: itemId, count } ] ;
            
        Chart.updateOne({_id: chart._id}, { items }, (err: CallbackError) => {
          if (err) {
            throw new Error(err.message);
          }
        });

        res.status(200).send(constructResponse("Success"));
      } else {
        Chart.create({ user, items: [{ item: itemId, count: count }] });
        res.status(200).send(constructResponse("Success"));
      }
    });
    
  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};
