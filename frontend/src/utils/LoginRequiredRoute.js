import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();
  console.log("isAuthenticated :", isAuthenticated);

  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props}></Component>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/Login",
                state: { from: props.location },
              }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
}
