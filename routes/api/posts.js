import express from "express";
import auth from "../../middleware/auth";
import Profile from "../../models/Profile";
import User from "../../models/User";
import Post from "../../models/Post";
import { check, validationResult} from "express-validator";

const router = express.Router();

router.post("/posts",[auth, [
  check("text", "Status is Required").not().isEmpty(),
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post( {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res.status(200).json(post);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.get("/posts", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1});

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.get("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({msg: "Post not found"});
    
    res.status(200).json(post);
  } catch (e) {
    if (e.kind === objectId) return res.status(404).json({msg: "Post not found"});
    res.status(500).send("server error")
  }
})



export default router;
