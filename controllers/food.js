import foodItem from "../models/foodData.js";
import mongoose from "mongoose";

export const getFoodBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    // const s = new RegExp(searchQuery, "i");
    const s = searchQuery;

    const result = await foodItem.find({
      $or: [
        { name: { $regex: s, $options: "i" } },
        { dis: { $regex: s, $options: "i" } },
      ],
    });

    res.json({ data: result });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createItem = async (req, res) => {
  const post = req.body;
  const newItem = new foodItem({
    ...post,
    // creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found with this id");
  await foodItem.findByIdAndRemove(id);

  res.json("Item deleted");
};

export const updateItem = async (req, res) => {
  const { id: _id } = req.params;
  const newItem = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with this id");

  const updatedItem = await foodItem.findByIdAndUpdate(
    _id,
    { ...newItem, _id },
    { new: true }
  );

  res.json(updatedItem);
};
