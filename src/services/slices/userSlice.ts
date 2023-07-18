import { TUser, TUserForm } from "../types/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  user: TUserForm;

  isUserAuthed: boolean;

  updateUserRequest: boolean;
  updateUserSuccess: boolean;
  updateUserFailed: boolean;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;
  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;
};

const initialState: TInitialState = {
  user: {
    email: "",
    name: "",
    password: "",
  },

  isUserAuthed: false,

  updateUserRequest: false,
  updateUserSuccess: false,
  updateUserFailed: false,

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UPDATE_USER: (state, { payload }: PayloadAction<TUser>) => {
      state.user = { ...state.user, ...payload };
    },
    UPDATE_USER_REQUEST: (state) => {
      state.updateUserRequest = true;
    },
    UPDATE_USER_SUCCESS: (state) => {
      state.updateUserRequest = false;
      state.updateUserFailed = false;
      state.registerSuccess = true;
    },
    UPDATE_USER_FAILED: (state) => {
      state.updateUserFailed = true;
      state.updateUserRequest = false;
    },

    LOGIN_REQUEST: (state) => {
      state.loginRequest = true;
    },
    LOGIN_SUCCESS: (state) => {
      state.isUserAuthed = true;
      state.loginRequest = false;
      state.loginFailed = false;
      state.loginSuccess = true;
    },
    LOGIN_FAILED: (state) => {
      state.loginFailed = true;
      state.loginRequest = false;
    },
    LOGOUT_REQUEST: (state) => {
      state.logoutRequest = true;
    },
    LOGOUT_SUCCESS: (state) => {
      state.isUserAuthed = false;
      state.logoutRequest = false;
      state.logoutFailed = false;
      state.logoutSuccess = true;
    },
    LOGOUT_FAILED: (state) => {
      state.logoutFailed = true;
      state.logoutRequest = false;
    },
    CLEAR_USER: (state) => {
      state.user = { ...state.user, email: "", name: "", password: "" };
    },

    REGISTER_REQUEST: (state) => {
      state.registerRequest = true;
    },
    REGISTER_SUCCESS: (state) => {
      state.registerRequest = false;
      state.registerFailed = false;
      state.registerSuccess = true;
    },
    REGISTER_FAILED: (state) => {
      state.registerFailed = true;
      state.registerRequest = false;
    },

    RESET_PASSWORD_REQUEST: (state) => {
      state.resetPasswordRequest = true;
    },
    RESET_PASSWORD_SUCCESS: (state) => {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = false;
      state.resetPasswordSuccess = true;
    },
    RESET_PASSWORD_FAILED: (state) => {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    },

    FORGOT_PASSWORD_REQUEST: (state) => {
      state.forgotPasswordRequest = true;
    },
    FORGOT_PASSWORD_SUCCESS: (state) => {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = false;
      state.forgotPasswordSuccess = true;
    },
    FORGOT_PASSWORD_FAILED: (state) => {
      state.forgotPasswordFailed = true;
      state.forgotPasswordRequest = false;
    },
  },
});

export default userSlice.reducer;
export const {
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
} = userSlice.actions;
