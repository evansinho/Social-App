import express from "express";
import auth from "../../middleware/auth";
import User from "../../models/User";

const router = express.Router();

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
      res.json(user);
  } catch (e) {
    res.status(500).json("server error")
  }
})


export default router;
