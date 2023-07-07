import { RootState } from "../types";

export const getWsFeedOrders = (store: RootState) => store.wsfeed.orders;
