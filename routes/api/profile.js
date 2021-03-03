import express from "express";
import auth from "../../middleware/auth";
import Profile from "../../models/Profile";
import User from "../../models/User";
import request from "request";
import dotenv from "dotenv";
import pkg from 'express-validator';
const { check, validationResult} = pkg;

dotenv.config();
const clientId = process.env.githubClientId;
const clientSecret = process.env.githubClientSecret;

const router = express.Router();

router.get("/profile/me", auth , async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(404).json({msg: "There is no profile for this user"});

    res.status(200).json(profile);

  } catch (e) {
    res.status(500).send("server error")
  }
})

router.post("/profile", [auth, [
  check("status", "Status is Required").not().isEmpty(),
  check("skills", "Skills is Required").not().isEmpty()
]] , async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);

  } catch (e) {
    res.status(500).send("server error")
  }
})

router.get("/profile", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json(profiles);

  } catch (e) {
    res.status(500).send("server error")
  }
})

router.get("/profile/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id}).populate("user", ["name", "avatar"]);
    if(!profile) return res.status(400).json({ msg: " No Profile for this user"})

    res.status(200).json(profile);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.delete("/profile", auth ,  async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id});
    await User.findOneAndRemove({ _id: req.user.id});

    res.status(200).json({ msg: "User deleted"});
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.put("/profile/experience", [auth, [
  check("title", "Title is required").not().notEmpty(),
  check("company", "Company is required").not().notEmpty(),
  check("from", "From date is required").not().notEmpty(),
]] ,  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {
      title,
      company,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description
    }

    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    res.status(200).json(profile);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.delete("/profile/experience/:exp_id", auth ,  async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.status(200).json(profile);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.put("/profile/education", [auth, [
  check("school", "School is required").not().notEmpty(),
  check("degree", "Degree is required").not().notEmpty(),
  check("fieldofstudy", "Field of study is required").not().notEmpty(),
  check("from", "From date is required").not().notEmpty(),
]] ,  async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {
      school,
      degree,
      from,
      to,
      current,
      fieldofstudy,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      from,
      to,
      current,
      fieldofstudy,
      description
    }

    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    res.status(200).json(profile);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.delete("/profile/education/:edu_id", auth ,  async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education.map(edu => edu.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.status(200).json(profile);
  } catch (e) {
    res.status(500).send("server error")
  }
})

router.get("/profile/github/:username", async (req, res) => {
  try {
    const options = {
      uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`,
      method: "GET",
      headers: {"user-agent": "node.js"}
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) return res.status(404).json({msg : "No Github user found"})

      return res.json(JSON.parse(body));
    })
  } catch (e) {
    res.status(500).send("server error")
  }
})


export default router;
