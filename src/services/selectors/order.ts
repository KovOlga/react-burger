import { RootState } from "../types";

export const getorderNumberRequest = (store: RootState) =>
  store.orderNumber.orderNumberRequest;

export const getConstructorEmpty = (store: RootState) =>
  store.orderNumber.isConstructorEmpty;

export const getOrderNumber = (store: RootState) =>
  store.orderNumber.orderInfo?.number; ///check
