import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "item",
  }],
});

export const Chart = mongoose.model("chart", chartSchema);
