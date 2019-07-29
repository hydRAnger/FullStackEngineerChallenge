import axios from "axios";

import { CREATE_REVIEW_DOING, CREATE_REVIEW_SUCCESS, FETCH_RECEIVED_REVIEWS_DOING, FETCH_RECEIVED_REVIEWS_SUCCESS } from "./types";

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
      console.error(err.response.data);
    });
};