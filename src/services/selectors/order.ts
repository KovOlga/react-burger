import { RootState } from "../types";

export const getNewOrderRequest = (store: RootState) =>
  store.newOrder.newOrderRequest;

export const getNewOrderSuccess = (store: RootState) =>
  store.newOrder.newOrderSuccess;

export const getConstructorEmpty = (store: RootState) =>
  store.newOrder.isConstructorEmpty;

export const getNewOrderInfo = (store: RootState) => store.newOrder.orderInfo;
