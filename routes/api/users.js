import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import pkg from 'express-validator';
import gravatar from "gravatar";
const { check, validationResult} = pkg;

dotenv.config();
const SECRET = process.env.SECRET;

const router = express.Router();

router.post("/users", [
  check("name", "Name is Required").not().notEmpty(),
  check("email", "Email can not be empty").isEmail(),
  check("password", "Please enter a password with six or more characters").isLength({min: 6})
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({errors: [{ msg: "User already exist"}]});

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    })

    user = new User({
      name,
      email,
      password,
      avatar
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
