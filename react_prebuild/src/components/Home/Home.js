import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AppBar from "./AppBar";

export const Home = props => {
  return (
    <Fragment>
      <AppBar history={props.history} />
      {/* This is home
      <br />
      <Link to={"/profile"}>
        <Typography variant="overline">TO PROFILE</Typography>
      </Link>
      <Link to={"/tvguide"}>
        <Typography variant="overline">TO TvGuide</Typography>
      </Link>
      <Link to={"/"}>
        <Typography variant="overline">TO LOGIN</Typography>
      </Link>
      <Link to={"/"}>
        <Typography
          variant="overline"
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
          }}
        >
          LOGOUT
        </Typography>
      </Link> */}
    </Fragment>
  );
};
