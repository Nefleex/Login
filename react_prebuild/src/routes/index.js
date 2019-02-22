import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import TvGuide from "../components/TvGuide/TvGuide";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import ProtectedRoute from "../components/ProtectedRoute";
import UserProfile from "../components/UserProfile";
import { Home } from "../components/Home/Home";

import Profile from "../components/Profile/Profile";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={RegisterForm} />
      <Route path="/tvguide" component={ProtectedRoute(TvGuide)} />
      <Route exact path="/home" component={ProtectedRoute(Home)} />
      <Route exact path="/profile" component={UserProfile(Profile)} />

      <Route
        path="*"
        component={() => (
          <div>
            404: Not a valid website <Link to={"/"}>TO LOGIN</Link>{" "}
          </div>
        )}
      />
    </Switch>
  </BrowserRouter>
);
