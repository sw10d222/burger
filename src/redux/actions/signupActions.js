import axios from "axios";
import { loginUserSuccess } from "./loginActions";
export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClwm6dgeziRBDgNoB9O4AOdcCT9Tt1L2A",
        data
      )
      .then((result) => {
        //LocalStorage ruu save
        const userId = result.data.localId;
        const token = result.data.idToken;

        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);

        dispatch(signupUserSuccess(token, userId));
      })
      .catch((err) => {
        dispatch(signupUserError(err));
      });
  };
};
export const signupUserStart = () => {
  return { type: "SIGNUP_USER_START" };
};
export const signupUserSuccess = (token, userId) => {
  return { type: "SIGNUP_USER_SUCCESS", token, userId };
};
export const signupUserError = (error) => {
  return { type: "SIGNUP_USER_ERROR", error };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirDate");
  localStorage.removeItem("refreshToken");

  return { type: "LOGOUT_USER" };
};
export const autologoutAfterMillisec = (ms) => {
  return function (dispatch) {
    // if(ms){
    // }
    // //https://securetoken.googleapis.com/v1/token?key=
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyClwm6dgeziRBDgNoB9O4AOdcCT9Tt1L2A",
    //     {
    //       grant_type: "refresh_token",
    //       refresh_token: localStorage.getItem("refreshToken"),
    //     }
    //   )
    //   .then((result) => {
    //     const token = result.data.id_token;
    //     const userId = result.data.user_id;
    //     //LocalStorage ruu save
    //     const expiresIn = result.data.expires_in;
    //     const expirDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     const refreshToken = result.data.refresh_token;
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("userId", userId);
    //     localStorage.setItem("expirDate", expirDate);
    //     localStorage.setItem("refreshToken", refreshToken);
    //     dispatch(loginUserSuccess(token, userId));
    //   })
    //   .catch((err) => {
    //     dispatch(signupUserError(err));
    //   });
  };
  // setTimeout(() => {
  //   dispatch(logout());
  // }, ms);
  //  };
};
