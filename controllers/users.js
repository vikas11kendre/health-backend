import User from "../models/user.js";
// import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const signin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "user does not exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "password is incorrect" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "some thing went wrong" });
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, confirmPassword, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "user already exist" });
    if (password !== confirmPassword)
      return res.status(404).json({ message: "password does not match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "some thing went wrong" });
  }
};

export const userUpdate = async (req, res) => {
  const { id: _id } = req.params;
  const newUser = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post found with this id");
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,

      { ...newUser, _id },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};
