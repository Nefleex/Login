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
import StatusDisplayer from "./StatusDisplayer";
import { Link } from "react-router-dom";
import "./RegisterForm.css";
const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 280
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
  class RegisterForm extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        userName: "",
        address: "",
        city: "",
        postalCode: "",
        phoneNumber: "",
        showPassword: false,
        responseText: ""
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

    validateForm = () => {};

    submit = () => {
      const data = {
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        address: this.state.address,
        city: this.state.city,
        postalCode: this.state.postalCode,
        phoneNumber: this.state.phoneNumber
      };
      const json = JSON.stringify(data);
      fetch("http://100.26.100.211:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: json
      })
        .then(response => response.json())
        .then(data => this.setState({ responseText: data.msg }))
        .catch(err => console.log(err));
    };

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="h5">REGISTER</Typography>
            {/* <TextField
            name="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.onChange}
            type="text"
            required="true"
          /> */}
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
            </FormControl>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input
                name="userName"
                id="component-simple"
                value={this.state.userName}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">City</InputLabel>
              <Input
                name="city"
                id="component-simple"
                value={this.state.city}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">Address</InputLabel>
              <Input
                name="address"
                id="component-simple"
                value={this.state.address}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">Postal Code</InputLabel>
              <Input
                name="postalCode"
                id="component-simple"
                value={this.state.postalCode}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl className={classes.FormControl}>
              <InputLabel htmlFor="component-simple">Phone number</InputLabel>
              <Input
                name="phoneNumber"
                id="component-simple"
                value={this.state.phoneNumber}
                onChange={this.onChange}
              />
            </FormControl>
            <br />
            <FormControl className={classes.FormControl}>
              <Button onClick={this.submit}>Click</Button>
              <StatusDisplayer text={this.state.responseText} />
              <Link to={"/"}>
                {" "}
                <Typography variant="overline">LOGIN</Typography>
              </Link>
            </FormControl>
          </div>
        </div>
      );
    }
  }
);
