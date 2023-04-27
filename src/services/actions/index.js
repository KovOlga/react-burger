import Api from "../api/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const ORDER_NUMBER_IS_EMPTY = "ORDER_NUMBER_IS_EMPTY";

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

const api = new Api();

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
      dispatch({ type: ORDER_NUMBER_IS_EMPTY, payload: true });
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
