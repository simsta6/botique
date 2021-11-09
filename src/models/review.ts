import mongoose, { Document, Types } from "mongoose";

export interface IReview extends Document  {
  user: Types.ObjectId;
  item: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
});

export const Review = mongoose.model<IReview>("review", reviewSchema);
