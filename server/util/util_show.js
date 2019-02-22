const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const moment = require("moment");
const Show = require("../models/show");

urlYle1 =
  "https://external.api.yle.fi/v1/programs/schedules.json?&service=yle-tv1&";

urlYle2 =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-tv2&";

urlYleTeema =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-teema-fem&";

urlYleAreena =
  "https://external.api.yle.fi/v1/programs/schedules.json?service=yle-areena&";

async function getShowsBetweenDates(a, b, source) {
  const result = await Show.find({
    channel: source,
    startTime: {
      $gte: `${a}`,
      $lt: `${b}`
    }
  });
  console.log(result);
  return result;
}

async function createShow(startTime, endTime, title, description, source) {
  try {
    const show = new Show({
      startTime: startTime,
      endTime: endTime,
      title: title,
      description: description,
      channel: source
    });
    const result = await show.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

getTvData = (offset1, offset2, url) => {
  try {
    axios
      .get(`${url}${formatTime(offset1, offset2)}&${process.env.API_KEY} `)
      .then(json => {
        json.data.data.map(item => {
          if (item.content.title.fi) {
            createShow(
              item.startTime,
              item.endTime,
              item.content.title.fi,
              item.content.description.fi,
              item.service.id
            );
          } else {
            createShow(
              item.startTime,
              item.endTime,
              item.content.title.sv,
              item.content.description.sv,
              item.service.id
            );
          }
        });
      })
      .catch(e => console.log(e));
  } catch (err) {
    console.log(err);
  }
};

formatTime = (offset1, offset2) => {
  let t = new Date();
  let t1 = new Date();
  t = moment(t);
  t1 = moment(t1);
  if (offset1 >= -1) {
    return `starttime=${t
      .add(`${offset1}`, "d")
      .format("YYYY-MM-DD")}T06%3A00%3A00.000%2B0200&endtime=${t1
      .add(`${offset2}`, "d")
      .format("YYYY-MM-DD")}T06%3A00%3A00.000%2B0200&`;
  } else {
  }
};

module.exports = {
  formatTime: formatTime,
  getTvData: getTvData,
  getShowsBetweenDates: getShowsBetweenDates,
  createShow: createShow
};
