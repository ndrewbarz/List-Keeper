import { CLEAR_ERROR, SET_AUTH, SET_ERROR, SET_LOADING, SET_USER } from ".";
import AuthService from "../../../services/AuthService";

export const AuthActionCreators = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setIsAuth: (auth) => ({ type: SET_AUTH, payload: auth }),
  setIsLoading: (payload) => ({ type: SET_LOADING, payload }),
  setError: (payload) => ({ type: SET_ERROR, payload }),
  clearError: () => ({ type: CLEAR_ERROR }),
  login: (email, password) => async (dispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await AuthService.login(email, password);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      dispatch(AuthActionCreators.setUser(response.data.user));
      dispatch(AuthActionCreators.setIsAuth(true));
      dispatch(AuthActionCreators.clearError());
    } catch (e) {
      // console.log(e.response.data.message);
      dispatch(AuthActionCreators.setError(e.response?.data?.message));
      dispatch(AuthActionCreators.clearError());
    }
  },
  registration: (email, password) => async (dispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await AuthService.registration(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      dispatch(AuthActionCreators.setUser(response.data.user));
      dispatch(AuthActionCreators.setIsAuth(true));
      dispatch(AuthActionCreators.clearError());
    } catch (e) {
      // console.log(e);
      dispatch(AuthActionCreators.setError(e.response?.data?.message));
      dispatch(AuthActionCreators.clearError());
    }
  },
  logout: () => async (dispatch) => {
    // dispatch(AuthService.logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(AuthActionCreators.setUser({}));
    dispatch(AuthActionCreators.setIsAuth(false));
    dispatch(AuthActionCreators.clearError());
  },
  checkIsAuth: () => async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await AuthService.refresh(refreshToken);
      // console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      dispatch(AuthActionCreators.setUser(response.data.user));
    } catch (err) {
      // console.log(err);
    }
  },
};
