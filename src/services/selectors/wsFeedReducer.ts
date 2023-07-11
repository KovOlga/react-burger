import { RootState } from "../types";

export const getWsFeedOrders = (store: RootState) => store.wsfeed.orders;
export const getWsFeedOrdersTotal = (store: RootState) => store.wsfeed.total;
export const getWsFeedOrdersTotalToday = (store: RootState) =>
  store.wsfeed.totalToday;
