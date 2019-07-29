import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const EmployeeRoute = ({ component: Component, authReducers, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authReducers.isAuthenticated ? (
        <Component user={authReducers.user} {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

const mapStateToProps = state => ({
  authReducers: state.authReducers
});

export default connect(mapStateToProps)(EmployeeRoute);