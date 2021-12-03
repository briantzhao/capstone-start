import { Component } from "react";
import { Redirect, Route } from "react-router-dom";

//checks if token exists in sessionStorage
//if not, sends user to homepage
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
