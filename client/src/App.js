import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";

import "./App.scss";
import store from "./store";
import Admin from "./components/admin/Admin";
import User from "./components/review/Review";
import Login from "./components/auth/SignIn";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/signin" component={Login} />
      </Router>
    </Provider>
  );
}

export default App;
