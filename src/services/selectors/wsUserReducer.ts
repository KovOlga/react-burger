import { RootState } from "../store";

export const getWsUserOrders = (store: RootState) => store.wsUser.orders;
