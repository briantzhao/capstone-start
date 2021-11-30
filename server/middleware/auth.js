const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ Message: "No token. Unauthorized" });
    }
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      req.decode = jwt.decode(token);
      req.user = req.decode.email;
      next();
    }
  } catch (error) {
    res.status(401).json({ Message: "Authentication failed" });
  }
};
