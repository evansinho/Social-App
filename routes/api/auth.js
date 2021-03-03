import express from "express";
import auth from "../../middleware/auth";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pkg from 'express-validator';
const { check, validationResult} = pkg;

dotenv.config();
const SECRET = process.env.SECRET;

const router = express.Router();

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
      res.json(user);
  } catch (e) {
    res.status(500).json("server error")
  }
})

router.post("/auth", [
  check("email", "Email can not be empty").isEmail(),
  check("password", "Password is required").exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({errors: [{ msg: "Invalid Credentials"}]});

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ errors: [{msg: "Invalid Credentials"}] });

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: "24h"
    });
    return res.status(200).json({ token })
  } catch (e) {
    console.error(e.message);
    res.status(500).json("server error")
  }
})


export default router;
