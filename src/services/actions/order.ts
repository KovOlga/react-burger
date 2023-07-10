import { TIngredient } from "../types/data";
import { AppThunk, AppDispatch } from "../types";
import { getOrderNumberFetch } from "../api/api";

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

interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}
interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly res: any;
}
interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}
interface IUpdateConstructorEmptinessAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_EMPTINESS;
  state: boolean;
}
interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}
interface IResetCountersAction {
  readonly type: typeof RESET_COUNTERS;
}

export type TOrdersActions =
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction
  | IUpdateConstructorEmptinessAction
  | IClearConstructorAction
  | IResetCountersAction;

export const GetOrderNumberRequestAction =
  (): IGetOrderNumberRequestAction => ({
    type: GET_ORDER_NUMBER_REQUEST,
  });
export const GetOrderNumberSuccessAction = (
  res: any
): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  res,
});
export const GetOrderNumberFailedAction = (): IGetOrderNumberFailedAction => ({
  type: GET_ORDER_NUMBER_FAILED,
});
export const UpdateConstructorEmptinessAction = (
  state: boolean
): IUpdateConstructorEmptinessAction => ({
  type: UPDATE_CONSTRUCTOR_EMPTINESS,
  state,
});
export const ClearConstructorAction = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});
export const ResetCountersAction = (): IResetCountersAction => ({
  type: RESET_COUNTERS,
});

export const getOrderNumber: AppThunk = (orderArr: string[]) => {
  return function (dispatch: AppDispatch) {
    if (orderArr.length === 0) {
      dispatch(UpdateConstructorEmptinessAction(true));
      return;
    }
    dispatch(GetOrderNumberRequestAction());
    getOrderNumberFetch(orderArr)
      .then((res) => {
        if (res.success) {
          dispatch(GetOrderNumberSuccessAction(res));
          localStorage.setItem("isOrderDetailsInfoModalShown", "true");
        }
      })
      .catch((e) => {
        dispatch(GetOrderNumberFailedAction());
      });
  };
};

export const closeOrderModalAction: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    return () => {
      dispatch(ClearConstructorAction());
      dispatch(ResetCountersAction());
      localStorage.setItem("isOrderDetailsInfoModalShown", "false");
    };
  };
};
