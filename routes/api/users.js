import express from "express";
import { check, validationResult} from "express-validator/check";

const router = express.Router();

router.post("/users", [
  check("name", "Name is Required").not().notEmpty(),
  check("email", "Email can not be empty").isEmail(),
  check("password", "Please enter a password with six or more characters").isLength({min: 6})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  res.status(200).send('hello')
})

export default router;
