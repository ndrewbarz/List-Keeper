export const SET_AUTH = "SET_AUTH";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";

const initialState = {
  isAuth: !!localStorage.getItem("accessToken") || false,
  error: "",
  isLoading: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, isAuth: action.payload };

    case SET_USER:
      return { ...state, user: action.payload, isLoading: false };

    case SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case CLEAR_ERROR:
      return { ...state, error: "", isLoading: false };

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}
