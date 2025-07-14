const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    role,
  });
  res.status(201).json({
    message: "user created successfully",
    user,
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("i am from body",req.body);
  
  const existingUser = User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({
      message: "user not found, please sign up first",
    });
  }


  const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign({ email, role, id }, process.env.JWT_SECRET_KEY);
  res.status(200).json({
    message: "user logged in successfully",
    token,
  });
};

module.exports = {
  register,
  login,
};