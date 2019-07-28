import axios from "axios";
import jwt_decode from "jwt-decode";

import { SIGNIN_SUCCESS, SIGNIN_DOING } from "./types";
import setAuthToken from "./setAuthToken";

// Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post("/api/users/register", userData)
//     .then(res => history.push("/login")) // re-direct to login on successful register
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// SignIn
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
  dispatch(setCurrentUser({}));
};
