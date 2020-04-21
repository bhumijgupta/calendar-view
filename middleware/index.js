const { verifyToken } = require("../utils/jwt");

let isAuthenticated = (req, res, next) => {
  // Check for header
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // Check for token
    if (token && verifyToken(token)) next();
    else {
      res.status(401).json({
        error: "Unauthorised",
      });
    }
  } else {
    res.status(401).json({
      error: "Unauthorised",
    });
  }
};

module.exports = { isAuthenticated };
