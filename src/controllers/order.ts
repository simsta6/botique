import { Response } from "express";
import { CallbackError } from "mongoose";
import { Request } from "../interfaces";
import { Chart, IChart } from "../models/chart";
import { Order, OrderState } from "../models/order";
import { constructResponse, ObjectId, sendFailResponse } from "../util";

export const postOrder = async (request: Request, res: Response): Promise<void> => { 
  try {
    const user = ObjectId((await request.user).user_id);

    Chart.findOne({user:(await request.user).user_id}, async (err: CallbackError, chart: IChart) => {
      if (err) {
        throw new Error(err.message);
      }

      if (chart) {
        const items = chart.items;

        const order = { user, items };

        const newOrder = await Order.create(order);

        res.status(200).send(constructResponse("Success", newOrder));
      } else {
        sendFailResponse(res, 404, "You don't have anything in your chart!");
      }
    });

  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};

export const changeOrderState = async (request: Request, res: Response): Promise<void> => { 
  try {
    const orderId = request.params.id;
    const state = request.body.state;

    if (!state || !Object.values(OrderState).some(availableOrderState => availableOrderState === state)) 
      throw new Error("Wrong state!");
    
    const order = await Order.findByIdAndUpdate(orderId, { state }, { new: true });

    res.status(201).send(constructResponse("Success", order));

  } catch (error) {
    sendFailResponse(res, 400, error.message);
  }
};