import axios from "axios";

import { FETCH_RECEIVED_REVIEWS_DOING, FETCH_RECEIVED_REVIEWS_SUCCESS } from "./types";

export const fetchReceivedReviews = (userData) => dispatch => {
  dispatch({
    type: FETCH_RECEIVED_REVIEWS_DOING
  });
  axios
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