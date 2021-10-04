import { Request, Response } from "express";
import { AnyTypeOfArray } from "./interfaces";

interface ResponseMessage {
  status: "Success" | "Failed",
  data: unknown
}

export const constructResponse = (status: "Success" | "Failed", data?: unknown): ResponseMessage => ({status, data});

export const isBodyEmpty = (request: Request): boolean => 
  request.body.constructor === Object && Object.keys(request.body).length === 0;

export const sendFailResponse = (res: Response, message?: string): void => 
  void res.status(400).send(constructResponse("Failed", message));

export const isIdExists = (data: AnyTypeOfArray[], id: number): boolean => data.some(x => x.id === id);
