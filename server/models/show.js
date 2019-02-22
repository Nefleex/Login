const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  startTime: { type: Date, unique: true },
  endTime: { type: Date, unique: true },
  title: String,
  description: String,
  channel: String
});

const Show = mongoose.model("Show", showSchema, "shows");

module.exports = Show;
