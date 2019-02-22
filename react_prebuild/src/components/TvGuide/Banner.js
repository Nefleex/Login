import React, { Component } from "react";
import "./Banner.css";

export default class Banner extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-banner">
          <div className="guide-1">
            <div>AREENA</div>
            <div>Ohjelmat</div>
            <div>Suorat</div>
            <div>TV-Opas</div>
            <div>Radio</div>
            <div>LASTEN AREENA</div>
          </div>
          <div className="guide-2">
            <div>Ohjeet</div>
            <div>Suosikit</div>
            <div>Jatka</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
