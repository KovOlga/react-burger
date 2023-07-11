import { RootState } from "../types";

export const getWsUserOrders = (store: RootState) => store.wsUser.orders;
