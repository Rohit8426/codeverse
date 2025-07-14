const jwt = require("jsonwebtoken");

exports.authenticationToken = (req, res, next) => {
  req.headers.authorization?.split(" ")[1];
  if (!token) return;
  res.status(401).json({
    success: false,
    message: "You are not logged in",
  });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        success: false,
        message: "You are not logged in",
      });
    req.user = user;
    next();
  });
};

exports.autherize = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }
  next();
};
