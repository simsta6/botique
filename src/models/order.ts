import mongoose, { Document, Types } from "mongoose";
import { IItem, itemsSchema } from "./chart";

export interface IOrder extends Document  {
  user: Types.ObjectId;
  seller: Types.ObjectId;
  items: IItem[];
  state?: OrderState;
}

export enum OrderState {
  PENDING = "pending",
  PAID = "paid",
  APPROVED = "approved",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  items: [itemsSchema],
  state: {
    type: String,
    enum : OrderState,
    default: OrderState.PENDING,
  },
});

export const Order = mongoose.model<IOrder>("order", orderSchema);
