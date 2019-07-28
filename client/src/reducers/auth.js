import {
  SIGNIN_DOING,
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
      // return state.set("user", { isLoading: true });
    case SIGNIN_SUCCESS:
      const user = action.payload;
      return {
        ...state,
        isAdmin: user.isAdmin,
        isAuthenticated: !!user,
        user
      };
    default:
      return state;
  }
}
