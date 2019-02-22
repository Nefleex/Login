import React, { Component } from "react";
import moment from "moment";
import "./Program.css";

export default class Program extends Component {
  constructor(props) {
    super();
    this.state = {
      programData: "",
      detailsToggled: false
    };
  }

  componentWillMount() {
    this.setState({ programData: this.props.channelData });
  }

  toggleProgramDetails = () => {
    this.setState({ detailsToggled: !this.state.detailsToggled });
  };

  render() {
    return (
      <React.Fragment>
        <div className="main" onClick={this.toggleProgramDetails}>
          <div>
            {moment(Date.parse(this.state.programData.startTime)).format(
              "HH.mm"
            )}
          </div>
          <div>
            {this.state.programData.title}
            <br />
          </div>
        </div>
        <div className="details">
          {this.state.detailsToggled
            ? this.state.programData.description
            : null}
        </div>
      </React.Fragment>
    );
  }
}
