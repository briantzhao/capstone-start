const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//creates new user
exports.signUpUser = (req, res) => {
  //hashes user password so it can't be read from data
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
      //if user creation is successful, returns user data along with JWT
      //sets password to null
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.status(201).json({ user: { ...newUser, password: null }, token });
    })
    .catch(() => {
      res.status(400).json({ Message: "Please enter required information" });
    });
};

//validates login for user
exports.signInUser = (req, res) => {
  const confirmedUser = User.findOne(req.body.email);
  if (!confirmedUser) {
    return res.status(500).json({ Message: "User not found" });
  }
  //checks if password matches password stored in data
  bcrypt.compare(req.body.password, confirmedUser.password).then((isMatch) => {
    if (!isMatch) {
      return res.status(400).json({ Message: "Invalid credentials" });
    }
    //if so, create a JWT and pass back to client
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

//return information about the current user
exports.getCurrentUser = (req, res, next) => {
  const confirmedUser = User.findOne(req.user);
  return res.json({ ...confirmedUser, password: null });
};
