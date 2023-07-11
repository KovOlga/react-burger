import { RootState } from "../types";

export const getNewOrderRequest = (store: RootState) =>
  store.newOrder.newOrderRequest;

export const getConstructorEmpty = (store: RootState) =>
  store.newOrder.isConstructorEmpty;

export const getNewOrderNumber = (store: RootState) =>
  store.newOrder.orderInfo?.number;
