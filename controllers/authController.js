var express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connect } = require("mongoose");

const signupHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userModel.findOne({ email });
    if (!loginUser) {
      return res.status(404).json({ message: "User not exists!" });
    }
    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Password/emailId is incorrect!" });
    }
    //generate JWT Token
    const token = jwt.sign({ loginUser }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // connect.log(token);
    loginUser.password = undefined;
    return res.json({
      loginUser,
      token: token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { loginHandler, signupHandler };
