import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import review from "./review";

export default combineReducers({
  auth,
  user,
  review
});