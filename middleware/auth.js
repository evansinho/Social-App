import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (typeof token === "undefined") {
    return res.status(401).json({
      msg: "Access denied. No token provided."
    });
  }
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) res.status(401).json({msg: "Invalid token."});
    req.user = decodedToken;
    next();
  });
};
