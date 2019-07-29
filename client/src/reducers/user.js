import {
  FETCH_EMPLOYEES_DOING,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_REVIEW_TARGET_SUCCESS
} from "../actions/types";

const initialState = {
  reviewTarget: {},
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES_DOING:
      return {
        ...state,
        loading: true
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case FETCH_REVIEW_TARGET_SUCCESS:
      const reviewTarget = state.reviewTarget;
      reviewTarget[action.userId] = action.payload;
      return {
        ...state,
        reviewTarget 
      };
    default:
      return state;
  }
}
