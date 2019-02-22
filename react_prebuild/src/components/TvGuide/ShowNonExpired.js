import React from "react";
import Program from "./Program";

import moment from "moment";

export default function ShowNonExpired(props) {
  let a = [];
  if (props.isLoaded && !props.showExpired) {
    props.currentDayShows.map((item, index) => {
      let itemTime = moment(item.endTime).format("YYYYDDMMHHMMSS");
      let currentTime = new Date();
      currentTime = moment(currentTime).format("YYYYDDMMHHMMSS");
      if (itemTime > currentTime) {
        a.push(<Program key={index} channelData={item} />);
      }
    });
  }
  return a.map((item, index) => (
    <React.Fragment key={index}>{item}</React.Fragment>
  ));
}
