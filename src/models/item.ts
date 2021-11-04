import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  color: { type: String, required: true },
  count: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
});

export const Item = mongoose.model("item", itemSchema);
