import { combineReducers } from "redux";

import authReducers from "./auth";
import userReducers from "./user";
import reviewReducers from "./review";

export default combineReducers({
  authReducers,
  userReducers,
  reviewReducers
});