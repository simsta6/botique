import mongoose, { Types } from "mongoose";

export interface IItem extends Document  {
  brand: string;
  color: string;
  count: number;
  size: number;
  price: number;
  imageUrl: string;
  seller: Types.ObjectId;
}

const itemSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  color: { type: String, required: true },
  count: { type: Number, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Item = mongoose.model<IItem>("item", itemSchema);
