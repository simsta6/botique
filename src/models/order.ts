import mongoose from "mongoose";

export enum State {
  WAITING_FOR_PAYMENT = "waiting_for_payment",
  WAITING_FOR_SELLER_APPROVEMENT = "waiting_for_seller_approvement",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  }],
  state: {
    type: String,
    enum : State,
    default: State.WAITING_FOR_PAYMENT
  },
});

export const Order = mongoose.model("order", orderSchema);
