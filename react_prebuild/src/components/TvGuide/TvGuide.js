import React, { Component, Fragment } from "react";
import Footer from "./Footer";
import ChannelContainer from "./ChannelContainer";
import ActionButton from "./ActionButton";
import "./TvGuide.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeather,
  faFeatherAlt,
  faCube,
  faCubes
} from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default class TvGuide extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      showExpired: false,
      apiData: "",
      yle1data: "",
      yle2data: "",
      minDate: 0,
      maxDate: 1
    };
  }
  // TO-DO:
  // Styling

  toggleShows = () => {
    this.setState({ showExpired: !this.state.showExpired });
  };

  // const urlForAllChannels = `https://external.api.yle.fi/v1/programs/services.json?type=tvchannel&$

  switchDate = e => {
    if (e.target.name === "previous") {
      this.setState({
        minDate: this.state.minDate - 1,
        maxDate: this.state.maxDate - 1
      });
    } else if (e.target.name === "next") {
      this.setState({
        maxDate: this.state.maxDate + 1,
        minDate: this.state.minDate + 1
      });
    }
  };

  formatTime = (offset1, offset2) => {
    let t1 = new Date();
    let t2 = new Date();
    t1 = moment(t1);
    t2 = moment(t2);
    t1 = t1.add(offset1, "d").format("YYYY-MM-DD");
    t2 = t2.add(offset2, "d").format("YYYY-MM-DD");
    return `startDate=${t1}&endDate=${t2}`;
  };

  // Display date, add or subtract days with parameters
  displayDate = offset => {
    let day = new Date();
    day = moment(day);
    day = day.add(offset, "d").format("DD.MM.YYYY");
    return <p className="date-display">{day}</p>;
  };

  logout = () => {
    this.props.history.push("/");
    localStorage.clear();
    sessionStorage.clear();
  };

  // `https://external.api.yle.fi/v1/programs/schedules.json?${process.env.REACT_APP_API_KEY}&service=yle-tv1&starttime=2019-01-23T12%3A00%3A00.000%2B0200&endtime=2019-01-23T14%3A00%3A00.000%2B0200`

  render() {
    const yle1url = `http://100.26.100.211:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-tv1`;
    const yle2url = `http://100.26.100.211:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-tv2`;
    const yleTeemaUrl = `http://100.26.100.211:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-teema-fem`;
    const yleAreenaUrl = `http://100.26.100.211:3000/api/shows?${this.formatTime(
      0,
      7
    )}&channel=yle-areena`;

    return (
      <div className="body">
        <div className="header" />
        <hr />
        <div className="date-select-container">
          <div className="date-select-sub">
            <div className="date-select-unit-left">
              <PreviousButton
                minDate={this.state.minDate}
                switchDate={this.switchDate}
              />

              {this.displayDate(this.state.minDate)}
              <NextButton
                minDate={this.state.minDate}
                switchDate={this.switchDate}
              />
            </div>

            <ToggleExpired
              toggleShows={this.toggleShows}
              minDate={this.state.minDate}
              showExpired={this.state.showExpired}
            />
          </div>

          <span className="info-box">Click on programs to show info.</span>
          <div className="nav-buttons">
            {/* <button
              className="button-profile"
              onClick={() => {
                this.props.history.push("/profile");
              }}
            >
              Profile
            </button> */}

            {/* <button className="button-logout" onClick={this.logout}>
              Logout
            </button> */}
            <StyledButton
              children={"Profile"}
              onClick={() => {
                this.props.history.push("/profile");
              }}
            />
            <StyledButton children={"Logout"} onClick={this.logout} />
          </div>
        </div>
        <hr />
        <div className="channels-main">
          <ChannelContainer
            url={yle1url}
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Yle 1"}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <ChannelContainer
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Yle 2"}
            url={yle2url}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />

          <ChannelContainer
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Areena"}
            url={yleAreenaUrl}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />
          <ChannelContainer
            titleIcon={<FontAwesomeIcon icon={faFeather} />}
            title={"Teema"}
            url={yleTeemaUrl}
            isToggled={this.state.showExpired}
            startDate={this.state.minDate}
            endDate={this.state.maxDate}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

function ToggleExpired(props) {
  if (props.minDate === 0 && !props.showExpired) {
    return (
      <StyledButton children={"Show Expired"} onClick={props.toggleShows} />
    );
  }
  if (props.minDate === 0 && props.showExpired) {
    return (
      <StyledButton children={"Hide Expired"} onClick={props.toggleShows} />
    );
  } else {
    return (
      <StyledButton
        children={"Show Expired"}
        style={{ visibility: "hidden" }}
      />
    );
  }
}

function NextButton(props) {
  return props.minDate <= 5 ? (
    <button className="date-nav-button" name="next" onClick={props.switchDate}>
      &gt;
    </button>
  ) : (
    <button className="date-nav-button  button-disabled" disabled>
      &gt;
    </button>
  );
}

function PreviousButton(props) {
  return props.minDate > 0 ? (
    <button
      className="date-nav-button"
      name="previous"
      onClick={props.switchDate}
    >
      &lt;
    </button>
  ) : (
    <button className="date-nav-button button-disabled" disabled>
      &lt;
    </button>
  );
}

const StyledButton = withStyles({
  root: {
    background: " #2d2f32",
    borderRadius: 1,
    border: "1px white solid",
    color: "white",
    height: 30,
    padding: "0 30px",
    // textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  },
  label: {
    textTransform: "capitalize"
  }
})(Button);
