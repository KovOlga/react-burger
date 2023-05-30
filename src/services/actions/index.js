import Api from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { deleteCookie, handleTokens } from "../../utils/utils";
import {
  IS_USER_AUTHED,
  UPDATE_USER,
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_BUN_COUNTER,
  TOGGLE_INGREDIENT_INFO_MODAL,
  TOGGLE_ORDER_INFO_MODAL,
  CLEAR_CONSTRUCTOR,
  RESET_COUNTERS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CLEAR_USER,
} from "../../utils/constants";

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
        console.log("error in getUserInfo:", e);
      });
  };
}

export function updateUserInfo(userNewInfo) {
  return function (dispatch) {
    api
      .updateUserInfo(userNewInfo)
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.user,
        });
      })
      .catch((e) => {
        console.log("e2", e);
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
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
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

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENT_REQUEST,
    });
    api
      .getIngredientsList()
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENT_SUCCESS,
          data,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENT_FAILED,
        });
      });
  };
}

export function getOrderNumber(orderArr) {
  return function (dispatch) {
    if (orderArr.length === 0) {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: true });
      return;
    }
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    api
      .getOrderNumber(orderArr)
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: res,
        });
        dispatch({
          type: TOGGLE_ORDER_INFO_MODAL,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
}

export const addConstructorItemAction = (itemId) => {
  const uuid = uuidv4();
  return (dispatch) => {
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, itemId, uuid });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };
};

export const deleteConstructorItemAction = (itemId, uniqueId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, uniqueId });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };
};

export const openIngredientModalAction = (item) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
  };
};

export const closeIngredientModalAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
    dispatch({ type: CLEAR_CURRENT_INGREDIENT });
  };
};

export const closeOrderModalAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ORDER_INFO_MODAL });
    dispatch({ type: CLEAR_CONSTRUCTOR });
    dispatch({ type: RESET_COUNTERS });
  };
};

export const swapConstructorBunAction = (itemId) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_BUN, itemId });
    dispatch({ type: UPDATE_BUN_COUNTER, itemId });
  };
};
