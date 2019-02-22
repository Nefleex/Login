import React, { Component, Fragment } from "react";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  withStyles,
  InputLabel,
  Input,
  FormHelperText,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import "./Login.css";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 320
  },
  FormControl: {
    width: "100%"
  },
  container: {
    width: 300,
    marginTop: 30
  }
});

export default withStyles(styles)(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        error: ""
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

    submit = () => {
      this.setState({ error: "" });
      const data = { email: this.state.email, password: this.state.password };
      const json = JSON.stringify(data);
      fetch("http://100.26.100.211:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("token", data.token);
          sessionStorage.setItem("token", data.token);
          console.log(data.msg);
          this.setState({ error: data.msg });
        })
        .then(() => {
          if (!this.state.error) this.props.history.push("/tvguide");
        })
        .catch(err => console.log(err));
    };

    // clearField = e => {
    //   if (this.state.error) this.setState({ [e.target.name]: "" });
    // };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="h5">LOGIN</Typography>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">Email</InputLabel>
              <Input
                name="email"
                id="component-simple"
                value={this.state.email}
                onChange={this.onChange}
              />
            </FormControl>
            <br />
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                name="password"
                id="adornment-password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button onClick={this.submit}>Submit</Button>
              <div>{this.state.error}</div>
              <Link to={"/register"}>
                <Typography variant="overline">Register</Typography>
              </Link>
            </FormControl>
          </div>
        </div>
      );
    }
  }
);
