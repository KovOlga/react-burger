import Api from "../api/api";
import { deleteCookie, handleTokens } from "../../utils/utils";

export const IS_USER_AUTHED = "isUserAuthed";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const CLEAR_USER = "CLEAR_USER";

const api = new Api();

export function getUserInfo() {
  return function (dispatch) {
    api
      .getUserInfo()
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.user,
        });
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };
}

export function updateUserInfo(userNewInfo) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    return api
      .updateUserInfo(userNewInfo)
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.user,
        });
      })
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
        });
      })
      .catch((e) => {
        console.log("error:", e);
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}

export function loginUser(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return api
      .loginUser(form)
      .then((res) => {
        handleTokens(res);
        return res;
      })
      .then((data) => {
        if (data.success) {
          dispatch({
            type: LOGIN_SUCCESS,
          });
          dispatch({
            type: UPDATE_USER,
            payload: data.user,
          });
        }
        return data;
      })
      .then(() => {
        localStorage.setItem(IS_USER_AUTHED, true);
      })
      .catch((e) => {
        console.log(e.message);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return api
      .logoutUser()
      .then(() => {
        dispatch({
          type: CLEAR_USER,
        });
      })
      .then(() => {
        deleteCookie("token");
      })
      .then(() => {
        localStorage.removeItem(IS_USER_AUTHED);
        localStorage.removeItem("refreshToken");
      })
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((e) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
        console.log(e.message);
      });
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    return api
      .forgotPassword(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .then(() => {
        localStorage.setItem("resetPasswordSent", true);
      })
      .catch((e) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    return api
      .resetPassword(password, token)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .then(() => {
        localStorage.removeItem("resetPasswordSent");
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function registerUser(form) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    api
      .registerUser(form)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch((e) => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}
