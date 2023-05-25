import Api from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, createContext } from "react";
import { setCookie, deleteCookie } from "../../utils/cookies";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS = "UPDATE_CONSTRUCTOR_EMPTINESS";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const SET_CURRENT_BUN = "SET_CURRENT_BUN";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";

export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";
export const UPDATE_BUN_COUNTER = "UPDATE_BUN_COUNTER";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

export const SORT_DRAGGING_ITEM = "SORT_DRAGGING_ITEM";

export const TOGGLE_INGREDIENT_INFO_MODAL = "TOGGLE_INGREDIENT_INFO_MODAL";

export const TOGGLE_ORDER_INFO_MODAL = "TOGGLE_ORDER_INFO_MODAL";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS = "RESET_COUNTERS";

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

const api = new Api();

export const UserContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

export function useAuth() {
  return useContext(UserContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const loginUser = async (form) => {
    const data = await api
      .loginUser(form)
      .then((res) => {
        let authToken;
        if (res.accessToken.indexOf("Bearer") === 0) {
          authToken = res.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken);
        }
        return res;
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
        return data;
      });
  };

  // const signOut = async () => {
  //   await api.logoutUser();
  //   setUser(null);
  //   deleteCookie("token");
  // };

  return {
    user,
    loginUser,
    // signOut,
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
        console.log(res);
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

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    api
      .forgotPassword(email)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        console.log(res);
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
    api
      .resetPassword(password, token)
      .then((res) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        console.log(res);
      })
      .catch((e) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
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
