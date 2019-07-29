
import {
  FETCH_ASSIGNMENT_REVIEWS_DOING,
  FETCH_ASSIGNMENT_REVIEWS_SUCCESS,
  FETCH_RECEIVED_REVIEWS_DOING,
  FETCH_RECEIVED_REVIEWS_SUCCESS
} from "../actions/types";

const initialState = {
  assignmentReviews: [],
  loadingAssignmentReviews: false,
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
    case FETCH_ASSIGNMENT_REVIEWS_DOING:
      return {
        ...state,
        loadingAssignmentReviews: true
      };
    case FETCH_ASSIGNMENT_REVIEWS_SUCCESS:
      return {
        ...state,
        loadingAssignmentReviews: false,
        assignmentReviews: action.payload
      }
    default:
      return state;
  }
}
