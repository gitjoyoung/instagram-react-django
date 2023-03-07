import React from "react";
import { Route ,Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AccountRoutes from "./account";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "./PostNew";
import NotFound from "./NotFound"
import SearchList from "components/SearchList";
function Root() {
  return (
    <Switch>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts" component={AccountRoutes} />
      <Route path="/search" component={SearchList} />

      {/* <Route  component={NotFound} /> */}

    </Switch>
  );
}

export default Root;
