import { Request as R } from "express";

export interface IUser extends Express.User {
  user_id?: string;
}

export interface Request extends R {
  user?: IUser;
}

export interface Review {
  id: number;
  itemId: number;
  userId: number;
  title: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface Item {
  id: number;
  label: string;
  color: string;
}

export interface ChartItem {
  id: number;
  count: number
}

export type AnyTypeOfArray = ChartItem | Item | Review;