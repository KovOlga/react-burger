import Api from "../api/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED = "GET_INGREDIENT_FAILED";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const SET_CURRENT_BUN = "SET_CURRENT_BUN";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";

export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";
export const UPDATE_BUN_COUNTER = "UPDATE_BUN_COUNTER";

export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

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
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST,
    });
    api
      .getOrderNumber(orderArr)
      .then((res) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED,
        });
      });
  };
}

export function addIngredient(id) {}
