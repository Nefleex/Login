const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetch = require("node-fetch");
const moment = require("moment");
const Show = require(".././models/show");
const util = require("../util/util_show");

router.get("/", async (req, res) => {
  // Format:
  // http://localhost:3000/api/shows?startDate=YYYY-DD-MM&endDate=YYYY-DD-MM&channel=channelHere
  const startTime = new Date(req.query.startDate);
  const endTime = new Date(req.query.endDate);
  const channel = req.query.channel;
  const result = await util.getShowsBetweenDates(startTime, endTime, channel);
  res.send(result);
});

urlYle1 =
  "https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&";

urlYle2 =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&";

urlYleTeema =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem&";

urlYleAreena =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena&";

module.exports = router;
