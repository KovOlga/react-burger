import { getNewOrderFetch } from "../api/api";
import { AppThunk } from "../store";
import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
  CLEAR_NEW_ORDER_INFO,
} from "../slices/orderSlice";
import { CLEAR_CONSTRUCTOR, RESET_COUNTERS } from "../slices/ingredientsSlice";

export const getNewOrderThunk =
  (orderArr: string[]): AppThunk =>
  (dispatch) => {
    if (orderArr.length === 0) {
      dispatch(UPDATE_CONSTRUCTOR_EMPTINESS(true));
      return;
    }
    dispatch(GET_ORDER_NUMBER_REQUEST());
    getNewOrderFetch(orderArr)
      .then((res) => {
        if (res.success) {
          dispatch(GET_ORDER_NUMBER_SUCCESS(res.order));
          localStorage.setItem("isOrderDetailsInfoModalShown", "true");
          localStorage.setItem(
            "newOrderConfirmedDetails",
            JSON.stringify(res.order)
          );
        }
      })
      .catch((e) => {
        dispatch(GET_ORDER_NUMBER_FAILED());
      });
  };

export const closeOrderModalAction = (): AppThunk => (dispatch) => {
  dispatch(CLEAR_CONSTRUCTOR());
  dispatch(RESET_COUNTERS());
  dispatch(CLEAR_NEW_ORDER_INFO());
  localStorage.setItem("isOrderDetailsInfoModalShown", "false");
  localStorage.removeItem("newOrderConfirmedDetails");
};
