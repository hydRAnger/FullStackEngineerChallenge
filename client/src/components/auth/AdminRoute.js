import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminRoute = ({ component: Component, authReducers, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authReducers.isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

const mapStateToProps = state => ({
  authReducers: state.authReducers
});

export default connect(mapStateToProps)(AdminRoute);