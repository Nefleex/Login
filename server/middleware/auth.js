const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.body.decoded = decoded;
        next();
      }
    });
  }
};
module.exports = auth;
