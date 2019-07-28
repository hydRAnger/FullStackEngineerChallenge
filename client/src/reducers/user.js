import {
  FETCH_EMPLOYEES_DOING,
  FETCH_EMPLOYEES_SUCCESS
} from "../actions/types";

const initialState = {
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
    default:
      return state;
  }
}
