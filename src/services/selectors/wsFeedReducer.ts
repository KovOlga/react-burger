import { RootState } from "../store";

export const getWsFeedOrders = (store: RootState) => store.wsFeed.orders;
export const getWsFeedOrdersTotal = (store: RootState) => store.wsFeed.total;
export const getWsFeedOrdersTotalToday = (store: RootState) =>
  store.wsFeed.totalToday;
