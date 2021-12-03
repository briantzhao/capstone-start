const jwt = require("jsonwebtoken");

//checks authorization header for the get current route in user routes
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //grabs token portion of authorization header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ Message: "No token. Unauthorized" });
    }
    //checks if token is valid
    //if so, populates req.user object with given user's email
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      req.decode = jwt.decode(token);
      req.user = req.decode.email;
      next();
    }
  } catch (error) {
    res.status(401).json({ Message: "Authentication failed" });
  }
};
