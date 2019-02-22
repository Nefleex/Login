import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

export default function UserProfile(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        response: null
      };
    }
    componentDidMount() {
      fetch("http://100.26.100.211:3000/api/users/me", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("token") ||
            sessionStorage.getItem("token"),
          "x-access-token":
            localStorage.getItem("token") || sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(res.error);
          }
        })
        .then(data => {
          console.log(data);
          this.setState({ loading: false, response: data });
        })
        .catch(err => {
          console.error(err);

          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      if (this.state.loading) {
        return null;
      }
      if (this.state.redirect) {
        return <Redirect to="/" />;
      }
      return (
        <Fragment>
          <WrappedComponent data={this.state.response} {...this.props} />
        </Fragment>
      );
    }
  };
}
