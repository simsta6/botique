import jwt from "jsonwebtoken";
import { sendFailResponse } from "../util";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = getToken(req);

    if (!token) {
      sendFailResponse(res, 403, "A token is required for authentication");
      return;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    sendFailResponse(res, 401, "Invalid Token");
  }
};

const getToken = (req: Request): string => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  return token;
};
