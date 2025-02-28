const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    console.log(decodedToken);
    // If Token is verified then user is attached to req.loginUser
    req.loginUser = await User.findById(decodedToken.loginUser._id).select(
      "-password"
    ); // Set user in req
    if (!req.loginUser)
      return res.status(404).json({ message: "User not found" });
    // console.log(decodedToken);
    // req.user = decodedToken;
    next();
  } catch (error) {
    res.status(402).json({ message: "Invalid token" });
  }
};

module.exports = { verifyJWT };
