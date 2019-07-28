
import {
  FETCH_RECEIVED_REVIEWS_DOING,
  FETCH_RECEIVED_REVIEWS_SUCCESS
} from "../actions/types";

const initialState = {
  receivedReviews: [],
  loadingReceivedReviews: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECEIVED_REVIEWS_DOING:
      return {
        ...state,
        loadingReceivedReviews: true
      };
    case FETCH_RECEIVED_REVIEWS_SUCCESS:
      return {
        ...state,
        loadingReceivedReviews: false,
        receivedReviews: action.payload
      };
    default:
      return state;
  }
}
