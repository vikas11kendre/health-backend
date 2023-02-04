import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  activity: { type: String },
  goal: { type: String },
});

export default mongoose.model("User", userSchema);
