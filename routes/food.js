import express from "express";

import {
  getFoodBySearch,
  // getPostsByCreator,
  // commentPost,
  // getPost,
  // getPosts,
  // createPost,
  // updatePost,
  // deletePost,
  // likePost,
  // trendingPosts,
  // getPostsByCatageory,
  createItem,
  deleteItem,
  updateItem,
} from "../controllers/food.js";
import auth from "../middleware/auth.js";
// import auth from "../middleware/auth.js";
const router = express.Router();

// router.get("/creator", getPostsByCreator);
router.get("/search", getFoodBySearch);
// router.get("/catageory", getPostsByCatageory);
// router.get("/", getPosts);
// router.get("/trending", trendingPosts);
// router.get("/:id", getPost);

// router.post("/", auth, createPost);
// router.patch("/:id", auth, updatePost);
// router.delete("/:id", auth, deletePost);
// router.patch("/:id/likePost", auth, likePost);
// router.post("/:id/commentPost", auth, commentPost);
router.patch("/update/:id", auth, updateItem);
router.post("/create", auth, createItem);
router.delete("/delete/:id", auth, deleteItem);
export default router;
