const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fetch = require("node-fetch");
const moment = require("moment");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const shows = require("./routes/shows");
const auth = require("./routes/auth");
const headers = require("./middleware/headers");
const Show = require("./models/show");
const util = require("./util/util_show");
const schedule = require("node-schedule");

const cors = require("cors");
require("dotenv").config();

// Check that index.js has been run with API_KEY set
if (process.env.API_KEY && process.env.JWT_PRIVATE_KEY) {
  console.log("Api key and JWT Secret have been set, proceeding...");
} else {
  throw new Error("Set environment variables on next start up");
}

// Mongoose connection to MongoDB
require("./database/db")();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
cors({ credentials: true, origin: true });
app.use(headers);
app.use("/api/users/", users);
app.use("/api/auth/", auth);
app.use("/api/shows/", shows);

app.get("/api/shows/", async (req, res) => {
  // http://localhost:3000/api/shows?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
  const startTime = new Date(req.query.startDate);
  const endTime = new Date(req.query.endDate);
  const channel = req.query.channel;
  const result = await util.getShowsBetweenDates(startTime, endTime, channel);
  res.send(result);
});

app.listen("3000");

fetchData = () => {
  Show.remove({}, function(err) {
    console.log("collection removed");
  });
  util.getTvData(0, 1, urlYle1);
  for (let i = 0; i <= 7; i++) {
    util.getTvData(i, i + 1, urlYle1);
  }

  for (let i = 0; i <= 7; i++) {
    util.getTvData(i, i + 1, urlYle2);
  }

  for (let i = 0; i <= 7; i++) {
    util.getTvData(i, i + 1, urlYleTeema);
  }

  for (let i = 0; i <= 7; i++) {
    util.getTvData(i, i + 1, urlYleAreena);
  }
};
// Fetch once on start up
fetchData();

// Fetch data from api on a schedule
const timedJob = schedule.scheduleJob("* 03 * * *", function() {
  console.log("Scheduler running");
  fetchData();
});
