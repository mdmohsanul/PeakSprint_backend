var express = require("express");
var router = express.Router();
var User = require("../models/user.model");
const { verifyJWT } = require("../middleware/isLoggedIn");
const {
  signupHandler,
  loginHandler,
} = require("../controllers/authController");

router.post("/signup", signupHandler);

router.post("/login", loginHandler);

router.get("/admin/data", verifyJWT, async (req, res) => {
  try {
    // console.log("Middleware User:", req.loginUser); // Debugging
    // const user = await User.findById(req.loginUser._id).select("-password"); // Exclude password
    // console.log("routes", user);
    // if (!user) return res.status(404).json({ message: "User not found" });

    // res.json(user);
    console.log("Middleware User:", req.loginUser); // Debugging

    if (!req.loginUser)
      return res.status(401).json({ message: "User not found" });

    res.json(req.loginUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
