import {
  FETCH_EMPLOYEE_DOING,
  FETCH_EMPLOYEE_SUCCESS
} from "../actions/types";

const initialState = {
  employees: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEE_DOING:
      return {
        ...state,
        loading: true
      };
    case FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload
      };
    default:
      return state;
  }
}
