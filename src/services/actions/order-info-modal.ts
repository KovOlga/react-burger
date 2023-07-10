import { AppThunk, AppDispatch } from "../types";
import { TUpdatedOrder } from "../types/data";

export const openOrderInfoModalThunk: AppThunk = (item: TUpdatedOrder) => {
  return function (dispatch: AppDispatch) {
    return () => {
      console.log("item", item);
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
