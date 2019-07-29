import axios from "axios";

import {
  FETCH_EMPLOYEES_DOING,
  FETCH_EMPLOYEES_SUCCESS,
  CREATE_EMPLOYEE_DOING,
  CREATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_DOING,
  UPDATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_DOING,
  DELETE_EMPLOYEE_SUCCESS
} from "./types";

export const createUser = (userData, history) => dispatch => {
  dispatch({
    type: CREATE_EMPLOYEE_DOING
  })
  return axios
    .post("/api/users/signup", userData)
    .then(res => {
      dispatch({
        type: CREATE_EMPLOYEE_SUCCESS,
        payload: res.data.user
      })
    })
    .catch(err => {
      console.error(err.response.data);
    });
};

export const updateUser = (userData, history) => dispatch => {
  dispatch({
    type: UPDATE_EMPLOYEE_DOING
  })
  return axios
    .put("/api/users/update", userData)
    .then(res => {
      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: res.data.user
      })
    })
    .catch(err => {
      console.error(err.response.data);
    });
};

export const deleteUser = (userData, history) => dispatch => {
  dispatch({
    type: DELETE_EMPLOYEE_DOING
  })
  return axios
    .delete("/api/users/delete", { data: userData })
    .then(res => {
      dispatch({
        type: DELETE_EMPLOYEE_SUCCESS
      });
    })
    .catch(err => {
      console.error(err.response.data);
    });
};

export const fetchUsers = () => dispatch => {
  dispatch({
    type: FETCH_EMPLOYEES_DOING
  });
  return axios
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