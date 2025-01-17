import axios from "axios";
import { message } from 'antd';
import jwt_decode from "jwt-decode";

import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS, SIGNIN_DOING } from "./types";
import setAuthToken from "./setAuthToken";

// Register User

// SignIn
// TO REVIEWER: I should make extra service layer for encapsulating the async operations.
// For time limit, I just put the async operation in action, temporarily.
export const signInUser = userData => dispatch => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      message.error(JSON.stringify(err.response.data));
      console.error(err.response.data);
    });
};

// Set user signin
export const setCurrentUser = user => {
  return {
    type: SIGNIN_SUCCESS,
    payload: user
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: SIGNIN_DOING
  };
};

// SignOut
export const signOutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: SIGNOUT_SUCCESS
  });
};
