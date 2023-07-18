import { deleteCookie, handleTokens } from "../../utils/utils";
import { TUserForm } from "../types/data";
import { AppThunk } from "../store";
import {
  getUserInfo,
  updateUserInfo,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  registerUser,
} from "../api/api";
import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  CLEAR_USER,
} from "../slices/userSlice";

export const IS_USER_AUTHED: "isUserAuthed" = "isUserAuthed";

export const getUserInfoThunk = (): AppThunk => (dispatch) => {
  return getUserInfo()
    .then((res) => {
      dispatch(UPDATE_USER(res.user));
    })
    .catch((e) => {
      console.log("error:", e);
    });
};

export const updateUserInfoThunk =
  (userNewInfo: TUserForm): AppThunk =>
  (dispatch) => {
    dispatch(UPDATE_USER_REQUEST());
    return updateUserInfo(userNewInfo)
      .then((res) => {
        dispatch(UPDATE_USER(res.user));
        dispatch(UPDATE_USER_SUCCESS());
      })
      .catch((e) => {
        console.log("error:", e);
        dispatch(UPDATE_USER_FAILED());
      });
  };

export const loginUserThunk =
  (form: TUserForm, onSucces: () => void): AppThunk =>
  (dispatch) => {
    dispatch(LOGIN_REQUEST());
    return loginUser(form)
      .then((res) => {
        handleTokens(res);
        localStorage.setItem(IS_USER_AUTHED, "true");
        if (res.success) {
          dispatch(LOGIN_SUCCESS());
          dispatch(UPDATE_USER(res.user));
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(LOGIN_FAILED());
      });
  };

export const logoutUserThunk =
  (onSucces: () => void): AppThunk =>
  (dispatch) => {
    dispatch(LOGOUT_REQUEST());
    return logoutUser()
      .then((res) => {
        if (res.success) {
          dispatch(CLEAR_USER());
          deleteCookie("token");
          localStorage.removeItem(IS_USER_AUTHED);
          localStorage.removeItem("refreshToken");
          dispatch(LOGOUT_SUCCESS());
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(LOGOUT_FAILED());
        console.log(e.message);
      });
  };

export const forgotPasswordThunk =
  (email: string, onSucces: () => void): AppThunk =>
  (dispatch) => {
    dispatch(FORGOT_PASSWORD_REQUEST());
    return forgotPassword(email)
      .then(() => {
        dispatch(FORGOT_PASSWORD_SUCCESS());
        localStorage.setItem("resetPasswordSent", "true");
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(FORGOT_PASSWORD_FAILED());
      });
  };

export const resetPasswordThunk =
  (
    { password, code }: { password: string; code: string },
    onSucces: () => void
  ): AppThunk =>
  (dispatch) => {
    dispatch(RESET_PASSWORD_REQUEST());
    return resetPassword(password, code)
      .then((res) => {
        if (res.success) {
          dispatch(RESET_PASSWORD_SUCCESS());
          localStorage.removeItem("resetPasswordSent");
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(RESET_PASSWORD_FAILED());
      });
  };

export const registerUserThunk =
  (form: TUserForm, onSucces: () => void): AppThunk =>
  (dispatch) => {
    dispatch(REGISTER_REQUEST());
    return registerUser(form)
      .then((res) => {
        if (res.success) {
          dispatch(REGISTER_SUCCESS());
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(REGISTER_FAILED());
      });
  };
