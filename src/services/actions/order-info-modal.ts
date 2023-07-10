import { AppThunk, AppDispatch } from "../types";
import { TOrder } from "../types/data";

export const openOrderInfoModalThunk: AppThunk = (item: TOrder) => {
  return function (dispatch: AppDispatch) {
    return () => {
      localStorage.setItem("isOrderInfoModalShown", "true");
      localStorage.setItem("currentOrderInfoShown", JSON.stringify(item));
    };
  };
};

export const closeOrderInfoModalThunk: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    return () => {
      localStorage.setItem("isOrderInfoModalShown", "false");
      localStorage.removeItem("currentOrderInfoShown");
    };
  };
};
