import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";

import "./App.scss";
import store from "./store";
import Admin from "./components/admin/Admin";
import Reviewer from "./components/review/Reviewer";
import SignIn from "./components/auth/SignIn";
import AdminRoute from "./components/auth/AdminRoute";
import EmployeeRoute from "./components/auth/EmployeeRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={SignIn} />
        <Route path="/signin" component={SignIn} />
        <Switch>
          <AdminRoute exact path="/admin" component={Admin} />
          <EmployeeRoute exact path="/review" component={Reviewer} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
