const headers = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
  );
  next();
};

module.exports = headers;
