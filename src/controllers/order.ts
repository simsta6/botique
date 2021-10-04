import { Request, Response } from "express";
import { chart } from "../data";
import { constructResponse, sendFailResponse } from "../util";

export const makeAnOrder = (request: Request, res: Response): void => {
  try {

    const isValidAddress = true;

    if (!chart.length || !isValidAddress)
      throw new Error();

    res.status(200).send(constructResponse("Success"));
    
  } catch (error) {
    sendFailResponse(res, error.message);
  }
};
