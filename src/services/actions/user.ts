import { deleteCookie, handleTokens } from "../../utils/utils";
import { TUserRegisterLoginResponse, TUser, TUserForm } from "../types/data";
import { AppThunk, AppDispatch } from "../types";
import {
  getUserInfo,
  updateUserInfo,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  registerUser,
} from "../api/api";

export const IS_USER_AUTHED: "isUserAuthed" = "isUserAuthed";
export const UPDATE_USER: "UPDATE_USER" = "UPDATE_USER";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" =
  "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" =
  "RESET_PASSWORD_FAILED";
export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";

interface IIsUserAuthedAction {
  readonly type: typeof IS_USER_AUTHED;
}
interface IUpdateUserAction {
  readonly type: typeof UPDATE_USER;
  readonly user: TUser;
}
interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
}
interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}
interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}
interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}
interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}
interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}
interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}
interface IClearUserAction {
  readonly type: typeof CLEAR_USER;
}

export type TUserActions =
  | IIsUserAuthedAction
  | IUpdateUserAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IClearUserAction;

export const IsUserAuthedAction = (): IIsUserAuthedAction => ({
  type: IS_USER_AUTHED,
});
export const UpdateUserAction = (user: TUser): IUpdateUserAction => ({
  type: UPDATE_USER,
  user,
});
export const UpdateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
});
export const UpdateUserSuccessAction = (): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
});
export const UpdateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
});
export const ForgotPasswordRequestAction =
  (): IForgotPasswordRequestAction => ({
    type: FORGOT_PASSWORD_REQUEST,
  });
export const ForgotPasswordSuccessAction =
  (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS,
  });
export const ForgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
});
export const ResetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST,
});
export const ResetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});
export const ResetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
});
export const RegisterRequestAction = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
});
export const RegisterSuccessAction = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
});
export const RegisterFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
});
export const LoginRequestAction = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});
export const LoginSuccessAction = (): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
});
export const LoginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED,
});
export const LogoutRequestAction = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});
export const LogoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});
export const LogoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED,
});
export const ClearUserAction = (): IClearUserAction => ({
  type: CLEAR_USER,
});

export const getUserInfoThunk: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    return getUserInfo()
      .then((res) => {
        dispatch(UpdateUserAction(res.user));
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };
};

export const updateUserInfoThunk: AppThunk = (userNewInfo: TUserForm) => {
  return function (dispatch: AppDispatch) {
    dispatch(UpdateUserRequestAction());
    return updateUserInfo(userNewInfo)
      .then((res) => {
        dispatch(UpdateUserAction(res.user));
        dispatch(UpdateUserSuccessAction());
      })
      .catch((e) => {
        console.log("error:", e);
        dispatch(UpdateUserFailedAction());
      });
  };
};

export const loginUserThunk: AppThunk = (
  form: TUserForm,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(LoginRequestAction());
    return loginUser(form)
      .then((res) => {
        handleTokens(res);
        localStorage.setItem(IS_USER_AUTHED, "true");
        if (res.success) {
          dispatch(LoginSuccessAction());
          dispatch(UpdateUserAction(res.user));
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(LoginFailedAction());
      });
  };
};

export const logoutUserThunk: AppThunk = (onSucces: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(LogoutRequestAction());
    return logoutUser()
      .then((res) => {
        if (res.success) {
          dispatch(ClearUserAction());
          deleteCookie("token");
          localStorage.removeItem(IS_USER_AUTHED);
          localStorage.removeItem("refreshToken");
          dispatch(LogoutSuccessAction());
        }
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(LogoutFailedAction());
        console.log(e.message);
      });
  };
};

export const forgotPasswordThunk: AppThunk = (
  email: string,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(ForgotPasswordRequestAction());
    return forgotPassword(email)
      .then(() => {
        dispatch(ForgotPasswordSuccessAction());
        localStorage.setItem("resetPasswordSent", "true");
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(ForgotPasswordFailedAction());
      });
  };
};

export const resetPasswordThunk: AppThunk = (
  { password, code }: { password: string; code: string },
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(ResetPasswordRequestAction());
    return resetPassword(password, code)
      .then((res) => {
        if (res.success) {
          dispatch(ResetPasswordSuccessAction());
          localStorage.removeItem("resetPasswordSent");
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(ResetPasswordFailedAction());
      });
  };
};

export const registerUserThunk: AppThunk = (
  form: TUserForm,
  onSucces: () => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(RegisterRequestAction());
    return registerUser(form)
      .then((res) => {
        if (res.success) {
          dispatch(RegisterSuccessAction());
        }
        return res;
      })
      .then(() => {
        onSucces();
      })
      .catch((e) => {
        dispatch(RegisterFailedAction());
      });
  };
};
