import { TConfirmedOrderResponse } from "../types/data";
import { AppThunk, AppDispatch } from "../types";
import { getNewOrderFetch } from "../api/api";

export const GET_ORDER_NUMBER_REQUEST: "GET_ORDER_NUMBER_REQUEST" =
  "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER_SUCCESS" =
  "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED: "GET_ORDER_NUMBER_FAILED" =
  "GET_ORDER_NUMBER_FAILED";
export const UPDATE_CONSTRUCTOR_EMPTINESS: "UPDATE_CONSTRUCTOR_EMPTINESS" =
  "UPDATE_CONSTRUCTOR_EMPTINESS";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const RESET_COUNTERS: "RESET_COUNTERS" = "RESET_COUNTERS";
export const CLEAR_NEW_ORDER_INFO: "CLEAR_NEW_ORDER_INFO" =
  "CLEAR_NEW_ORDER_INFO";

interface IgetNewOrderRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}
interface IgetNewOrderSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly res: TConfirmedOrderResponse;
}
interface IgetNewOrderFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}
interface IupdateConstructorEmptinessAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_EMPTINESS;
  state: boolean;
}
interface IclearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}
interface IresetCountersAction {
  readonly type: typeof RESET_COUNTERS;
}

interface IclearNewOrderInfoAction {
  readonly type: typeof CLEAR_NEW_ORDER_INFO;
}

export type TOrdersActions =
  | IgetNewOrderRequestAction
  | IgetNewOrderSuccessAction
  | IgetNewOrderFailedAction
  | IupdateConstructorEmptinessAction
  | IclearConstructorAction
  | IresetCountersAction
  | IclearNewOrderInfoAction;

export const getNewOrderRequestAction = (): IgetNewOrderRequestAction => ({
  type: GET_ORDER_NUMBER_REQUEST,
});
export const getNewOrderSuccessAction = (
  res: TConfirmedOrderResponse
): IgetNewOrderSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  res,
});
export const getNewOrderFailedAction = (): IgetNewOrderFailedAction => ({
  type: GET_ORDER_NUMBER_FAILED,
});
export const updateConstructorEmptinessAction = (
  state: boolean
): IupdateConstructorEmptinessAction => ({
  type: UPDATE_CONSTRUCTOR_EMPTINESS,
  state,
});
export const clearConstructorAction = (): IclearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});
export const resetCountersAction = (): IresetCountersAction => ({
  type: RESET_COUNTERS,
});
export const clearNewOrderInfoAction = (): IclearNewOrderInfoAction => ({
  type: CLEAR_NEW_ORDER_INFO,
});

export const getNewOrderThunk: AppThunk = (orderArr: string[]) => {
  return function (dispatch: AppDispatch) {
    if (orderArr.length === 0) {
      dispatch(updateConstructorEmptinessAction(true));
      return;
    }
    dispatch(getNewOrderRequestAction());
    getNewOrderFetch(orderArr)
      .then((res) => {
        if (res.success) {
          dispatch(getNewOrderSuccessAction(res.order));
          localStorage.setItem("isOrderDetailsInfoModalShown", "true");
          localStorage.setItem(
            "newOrderConfirmedDetails",
            JSON.stringify(res.order)
          );
        }
      })
      .catch((e) => {
        dispatch(getNewOrderFailedAction());
      });
  };
};

export const closeOrderModalAction: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(clearConstructorAction());
    dispatch(resetCountersAction());
    dispatch(clearNewOrderInfoAction());
    localStorage.setItem("isOrderDetailsInfoModalShown", "false");
    localStorage.removeItem("newOrderConfirmedDetails");
  };
};
