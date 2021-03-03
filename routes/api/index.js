import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import postsRouter from "./posts.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", profileRouter);
router.use("/", postsRouter);
router.use("/", usersRouter);

export default router;
