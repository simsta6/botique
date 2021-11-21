import { Request, Response } from "express";
import { Model, isValidObjectId, Types } from "mongoose";

interface ResponseMessage {
  status: "Success" | "Failed",
  data: unknown
}

export const constructResponse = (status: "Success" | "Failed", data?: unknown): ResponseMessage => ({status, data});

export const isBodyEmpty = (request: Request): boolean => 
  request.body.constructor === Object && Object.keys(request.body).length === 0;

export const sendFailResponse = (res: Response, statusCode = 400, message?: string): void => {
  void res.status(statusCode).send(constructResponse("Failed", message));
};

export const idDoesNotExist = (res: Response): void => 
  void res.status(404).send(constructResponse("Failed", "ID does not exist"));

export const isNumberPositive = (number: number): boolean => number > 0;

// eslint-disable-next-line @typescript-eslint/ban-types
export const isWrongId = async (model: Model<unknown, {}, {}, {}>, _id: string): Promise<boolean> => 
  !(isValidObjectId(_id) && (await model.exists({ _id })));

export const ObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id);