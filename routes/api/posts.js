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

router.delete("/posts/:id", auth ,  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({msg: "Post not found"});
    if(post.user.toString() !== req.user.id) return res.status(401).json({msg: "User not Authorized"});

    await post.remove();
    res.status(200).json({ msg: "Post deleted"});
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.put("/posts/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) return res.status(400).json({msg: "Post already liked "});
    
    post.likes.unshift({ user: req.user.id})

    await post.save();

    res.status(200).json(post.likes);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.put("/posts/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) return res.status(400).json({msg: "Post has not been liked you "});
    
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).json(post.likes);
  } catch (e) {
    res.status(500).send("server error")
  }
})

export default router;
