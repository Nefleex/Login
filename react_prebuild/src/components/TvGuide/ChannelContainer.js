import React, { Component, Fragment } from "react";
import TestChannel from "./TestChannel";
import moment from "moment";

export default class ChannelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      url: this.props.url,
      isLoaded: false,
      showExpired: false,
      allShows: "",
      loadError: "",
      dateRange: [0, 1],
      currentDayShows: []
    };
  }
  //   componentWillReceiveProps(props, nextProps) {
  //     this.setState(
  //       {
  //         showExpired: props.isToggled,
  //         dateRange: [this.props.startDate, this.props.endDate]
  //       },
  //       () => {
  //         this.parseCurrentDayShows(
  //           this.state.dateRange[0],
  //           this.state.dateRange[1]
  //         );
  //       }
  //     );
  //   }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // this.fetchData();

      this.setState(
        {
          dateRange: [this.props.startDate, this.props.endDate],
          showExpired: this.props.isToggled
        },
        () => {
          this.parseCurrentDayShows(
            this.state.dateRange[0],
            this.state.dateRange[1]
          );
        }
      );
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  parseCurrentDayShows = (offset1, offset2) => {
    console.log("Mapping");
    let d1 = new Date();
    let d = new Date();
    d1 = moment(d1)
      .add(offset2, "d")
      .format("YYYYDDMM");
    d = moment(d)
      .add(offset1, "d")
      .format("YYYYDDMM");
    d1 = `${d1}040000`;
    d = `${d}040000`;
    let shows = [];

    if (this.state.dateRange[0] === 0 && !this.state.showExpired) {
      let now = new Date();
      now = moment(now).format("YYYYDDMMHHMMSS");

      this.setState({ currentDayShows: [] }, () => {
        this.state.allShows.map(item => {
          let time = moment(item.startTime).format("YYYYDDMMHHMMSS");
          if (time >= now && time <= d1) {
            shows.push(item);
          }
        });
        this.setState({
          currentDayShows: shows
        });
      });
    } else {
      this.setState({ currentDayShows: [] }, () => {
        this.state.allShows.map(item => {
          let time = moment(item.startTime).format("YYYYDDMMHHMMSS");

          if (time >= d && time <= d1) {
            shows.push(item);
          }
        });
        this.setState({
          currentDayShows: shows
        });
      });
    }
  };

  fetchData = () => {
    console.log("Fetching");
    this.setState({
      url: `${this.props.url}`,
      isLoaded: false
    });
    fetch(this.state.url)
      .then(response => response.json())
      .then(contents => this.setState({ allShows: contents, isLoaded: true }))
      .then(() =>
        this.parseCurrentDayShows(
          this.state.dateRange[0],
          this.state.dateRange[1]
        )
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <TestChannel
          data={this.state.currentDayShows}
          isToggled={this.state.isLoaded}
          title={this.props.title}
        />
      </Fragment>
    );
  }
}
