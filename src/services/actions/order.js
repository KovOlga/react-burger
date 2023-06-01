import Api from "../api/api";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS = "UPDATE_CONSTRUCTOR_EMPTINESS";
export const TOGGLE_ORDER_INFO_MODAL = "TOGGLE_ORDER_INFO_MODAL";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS = "RESET_COUNTERS";

const api = new Api();

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

export const closeOrderModalAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ORDER_INFO_MODAL });
    dispatch({ type: CLEAR_CONSTRUCTOR });
    dispatch({ type: RESET_COUNTERS });
  };
};
