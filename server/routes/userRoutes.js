const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require("../controllers/usersController");

//create new user
router.post("/signup", signUpUser);

//attempt to log in user
router.post("/login", signInUser);

//return information about current user
router.get("/current", auth, getCurrentUser);

module.exports = router;
