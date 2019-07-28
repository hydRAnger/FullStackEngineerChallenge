import axios from "axios";

import { FETCH_EMPLOYEES_DOING, FETCH_EMPLOYEES_SUCCESS } from "./types";

export const fetchUsers = () => dispatch => {
  dispatch({
    type: FETCH_EMPLOYEES_DOING
  });
  axios
    .get("/api/users/list")
    .then(res => {
      dispatch({
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: res.data.users
      });
    })
    .catch(err => {
      console.error(err.response.data);
    });
};