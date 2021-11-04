import mongoose from "mongoose";

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
  review: { type: String },
});

export const Review = mongoose.model("review", reviewSchema);
