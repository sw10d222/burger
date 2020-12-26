import axios from "axios";
import * as actions from "./signupActions";
export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClwm6dgeziRBDgNoB9O4AOdcCT9Tt1L2A",
        data
      )
      .then((result) => {
        //LocalStorage ruu save
        const token = result.data.idToken;
        const userId = result.data.localId;
        const expiresIn = result.data.expiresIn;
        const expirDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expirDate", expirDate);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(loginUserSuccess(token, userId));
        dispatch(actions.autologoutAfterMillisec(expiresIn * 1000));
      })
      .catch((err) => {
        dispatch(loginUserError(err));
      });
  };
};
export const loginUserStart = () => {
  return { type: "LOGIN_USER_START" };
};
export const loginUserSuccess = (token, userId) => {
  return { type: "LOGIN_USER_SUCCESS", token, userId };
};
export const loginUserError = (error) => {
  return { type: "LOGIN_USER_ERROR", error };
};
