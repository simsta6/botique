import mongoose, { Document, Types } from "mongoose";

interface IItem extends Document {
  item: Types.ObjectId;
  count: number;
}

export interface IChart extends Document  {
  user: Types.ObjectId;
  items: IItem[];
}

const itemsSchema = new mongoose.Schema({
  item: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  },
  count: { type: Number },
}, { _id : false });

const chartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [itemsSchema],
});

export const Chart = mongoose.model<IChart>("chart", chartSchema);
