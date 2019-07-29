import {
  SIGNIN_DOING,
  SIGNOUT_SUCCESS,
  SIGNIN_SUCCESS
} from "../actions/types";

const initialState = {
  isAdmin: false,
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_DOING:
      return {
        ...state,
        loading: true
      };
    case SIGNIN_SUCCESS:
      const user = action.payload;
      return {
        ...state,
        isAdmin: user.isAdmin,
        isAuthenticated: !!user,
        user
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isAdmin: false,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
