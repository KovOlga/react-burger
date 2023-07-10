import { AppThunk, AppDispatch } from "../types";
import { TOrder } from "../types/data";

export const openOrderInfoModalThunk =
  (item: TOrder): any =>
  (dispatch: any) => {
    return () => {
      localStorage.setItem("isOrderInfoModalShown", "true");
      localStorage.setItem("currentOrderInfoShown", JSON.stringify(item));
    };
  };

export const closeOrderInfoModalThunk = (): any => (dispatch: any) => {
  return () => {
    localStorage.setItem("isOrderInfoModalShown", "false");
    localStorage.removeItem("currentOrderInfoShown");
  };
};
