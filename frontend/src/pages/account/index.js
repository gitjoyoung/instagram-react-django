import React from "react";
import { Route } from "react-router-dom";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import Game from "./Game";
import AppEvent from "./AppEvent"
import SearchList from "components/SearchList";
function Routes({ match }) {
  return (
    <>
      <LoginRequiredRoute
        exact
        path={match.url + "/profile/"}
        component={Profile}
      />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
      <Route exact path={match.url + "/game"} component={Game} />
      <Route exact path={match.url + "/search"} component={SearchList} />
      <Route exact path={match.url + "/event"} component={AppEvent} />


    </>
  );
}
export default Routes;
