const initialState = {
  saving: false,
  logginIn: false,
  firebaseError: null,
  userId: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START":
      return {
        ...state,
        saving: true,
      };
    case "SIGNUP_USER_SUCCESS":
      return {
        ...state,
        saving: false,
        token: action.idToken,
        userId: action.userId,
      };
    case "SIGNUP_USER_ERROR":
      return {
        ...state,
        saving: false,
        firebaseError: action.error.response.data.error.message,
      };

    //=================================================================================
    case "LOGIN_USER_START":
      return {
        ...state,
        logginIn: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        logginIn: false,
        token: action.idToken,
        userId: action.userId,
      };
    case "LOGIN_USER_ERROR":
      return {
        ...state,
        logginIn: false,
        firebaseError: action.error.response.data.error.message,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        token: null,
        userId: null,
        firebaseError: null,
      };

    default:
      return state;
  }
};

export default reducer;
