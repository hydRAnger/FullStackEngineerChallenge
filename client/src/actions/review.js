import axios from "axios";
import { message } from 'antd';

import {
  CREATE_REVIEW_DOING,
  CREATE_REVIEW_SUCCESS,
  FETCH_RECEIVED_REVIEWS_DOING,
  FETCH_RECEIVED_REVIEWS_SUCCESS,
  FETCH_ASSIGNMENT_REVIEWS_DOING,
  FETCH_ASSIGNMENT_REVIEWS_SUCCESS,
  SUBMIT_REVIEW_DOING,
  SUBMIT_REVIEW_SUCCESS
} from "./types";

export const fetchReceivedReviews = (userData) => dispatch => {
  dispatch({
    type: FETCH_RECEIVED_REVIEWS_DOING
  });
  return axios
    .get("/api/reviews/received", {params: {
      ...userData
    }})
    .then(res => {
      dispatch({
        type: FETCH_RECEIVED_REVIEWS_SUCCESS,
        payload: res.data.reviews
      });
    })
    .catch(err => {
      message.error(JSON.stringify(err.response.data));
      console.error(err.response.data);
    });
};

export const fetchAssignmentReviews = userData => dispatch => {
  dispatch({
    type: FETCH_ASSIGNMENT_REVIEWS_DOING
  });
  return axios
    .get("/api/reviews/assignments", {
      params: {
        ...userData
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_ASSIGNMENT_REVIEWS_SUCCESS,
        payload: res.data.reviews
      });
    })
    .catch(err => {
      message.error(JSON.stringify(err.response.data));
      console.error(err.response.data);
    });
};

export const createReview = reviewData => dispatch => {
  dispatch({
    type: CREATE_REVIEW_DOING
  });
  return axios
    .post("/api/reviews/create", reviewData)
    .then(res => {
      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: res.data.review
      });
    })
    .catch(err => {
      message.error(JSON.stringify(err.response.data));
      console.error(err.response.data);
    });
};

export const submitReview = reviewData => dispatch => {
  dispatch({
    type: SUBMIT_REVIEW_DOING
  });
  return axios
    .post("/api/reviews/submit", reviewData)
    .then(res => {
      dispatch({
        type: SUBMIT_REVIEW_SUCCESS,
        payload: res.data.review
      });
    })
    .catch(err => {
      message.error(JSON.stringify(err.response.data));
      console.error(err.response.data);
    });
};