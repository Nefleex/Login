const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://mongo:27017/database", { useNewUrlParser: true })
    .then(() => console.log("Connected to Mongodb"))
    .catch(err => console.log(err));
};
