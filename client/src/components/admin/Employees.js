import React from "react";
import { connect } from "react-redux";

class Employees extends React.Component {
  render() {
    return <h1>Employees</h1>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(Employees);
