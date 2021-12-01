const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signUpUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 8)
    .then((password) => {
      const userObj = { ...req.body, password: password };
      const newUser = User.create(userObj);
      if (newUser === -1) {
        return res
          .status(400)
          .json({ Message: "A user with that email already exists" });
      }
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.status(201).json({ user: { ...newUser, password: null }, token });
    })
    .catch(() => {
      res.status(400).json({ Message: "Please enter required information" });
    });
};

exports.signInUser = (req, res) => {
  const confirmedUser = User.findOne(req.body.email);
  if (!confirmedUser) {
    return res.status(500).json({ Message: "User not found" });
  }
  bcrypt.compare(req.body.password, confirmedUser.password).then((isMatch) => {
    if (!isMatch) {
      return res.status(400).json({ Message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: confirmedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res
      .status(200)
      .json({ user: { ...confirmedUser, password: null }, token });
  });
};

exports.getCurrentUser = (req, res, next) => {
  const confirmedUser = User.findOne(req.user);
  return res.json({ ...confirmedUser, password: null });
};
