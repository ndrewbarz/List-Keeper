import { SET_AUTH, SET_ERROR, SET_LOADING, SET_USER } from ".";
import AuthService from "../../../services/AuthService";

export const AuthActionCreators = {
  setUser: (user) => ({ type: SET_USER, payload: user }),
  setIsAuth: (auth) => ({ type: SET_AUTH, payload: auth }),
  setIsLoading: (payload) => ({ type: SET_LOADING, payload }),
  setError: (payload) => ({ type: SET_ERROR, payload }),
  login: (email, password) => async (dispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await AuthService.login(email, password);

      console.log("response", response);

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      dispatch(AuthActionCreators.setUser(response.data.user));
      dispatch(AuthActionCreators.setIsAuth(true));
    } catch (e) {
      console.log(e);
      dispatch(AuthActionCreators.setError("Error while Login"));
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
    } catch (e) {
      console.log(e);
      dispatch(AuthActionCreators.setError("Error while Registration"));
    }
  },
  logout: () => async (dispatch) => {
    // dispatch(AuthActionCreators.setIsLoading(true));

    // dispatch(AuthService.logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(AuthActionCreators.setUser({}));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
  checkIsAuth: () => async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await AuthService.refresh(refreshToken);
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      dispatch(AuthActionCreators.setUser(response.data.user));
    } catch (err) {
      console.log(err);
    }
  },
};
