import express from "express";
import authRouter from "./auth";
import profileRouter from "./profile";
import postsRouter from "./posts";
import usersRouter from "./users";

const router = express.Router();

router.use("/", authRouter);
router.use("/", profileRouter);
router.use("/", postsRouter);
router.use("/", usersRouter);

export default router;
