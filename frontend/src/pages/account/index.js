import React from "react";
import { Route } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import Game from "./Game";
import AppEvent from "./AppEvent";
import GoogleButton from "components/GoogleButton";
function Routes({ match }) {
  return (
    <>
      <LoginRequiredRoute exact path={match.url + "/profile/"} component={Profile} />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
      <Route exact path={match.url + "/game"} component={Game} />
      <Route exact path={match.url + "/event"} component={AppEvent} />
      <Route exact path={match.url + "/google"} component={GoogleButton} />


    </>
  );
}
export default Routes;
