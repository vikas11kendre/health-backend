import express from "express";
import { signin, signup, userUpdate } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:id", auth, userUpdate);

export default router;
