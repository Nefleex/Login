import React, { Component } from "react";
import Program from "./Program";
import ShowNonExpired from "./ShowNonExpired";
import moment from "moment";
import "./Channel.css";
import LoadingCircle from "./LoadingCircle";

export default class TestChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      showExpired: false,
      url: this.props.url,
      loadError: "",
      dateRange: [0, 1],
      currentDayShows: []
    };
  }

  formatTime = (offset1, offset2) => {
    let t1 = new Date();
    let t2 = new Date();
    t1 = moment(t1);
    t2 = moment(t2);
    t1 = t1.add(offset1, "d").format("YYYY-DD-MM");
    t2 = t2.add(offset2, "d").format("YYYY-DD-MM");
    return `startDate=${t1}&endDate=${t2}`;
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // this.fetchData();
      this.setState({
        showExpired: this.props.isToggled,
        dateRange: [this.props.startDate, this.props.endDate],
        isLoaded: true,
        currentDayShows: [...this.props.data]
      });
    }
  }

  render() {
    return (
      <div className="channel-main">
        <h1 className="channel-title">
          <div className="title-icon">{this.props.titleIcon}</div>

          {this.props.title}
        </h1>
        <div className="channel-content">
          <div>{!this.state.isLoaded ? <LoadingCircle /> : null}</div>
          <div>
            {this.state.isLoaded && this.state.showExpired
              ? // && this.state.showExpired
                this.state.currentDayShows.map((item, index) => (
                  <Program key={index} channelData={item} />
                ))
              : null}
          </div>

          <ShowNonExpired
            isLoaded={this.state.isLoaded}
            showExpired={this.state.showExpired}
            currentDayShows={this.state.currentDayShows}
          />
        </div>
      </div>
    );
  }
}
