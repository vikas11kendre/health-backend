import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  dis: { type: String, required: true },
  serving: { type: String, required: true },
  id: { type: String },
  weight: { type: String },
  calories: { type: String, required: true },
  fat: { type: String, default: "0" },
  carbs: { type: String, default: "0" },
  protin: { type: String, default: "0" },
  micro: { type: Object },
  creator: { type: String },
});

export default mongoose.model("foodItem", foodSchema);
