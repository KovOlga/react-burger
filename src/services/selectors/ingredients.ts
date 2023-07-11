import { RootState } from "../types";

export const getData = (store: RootState) => store.ingredients.data;
export const getDataRequest = (store: RootState) =>
  store.ingredients.dataRequest;
export const getDataFailed = (store: RootState) => store.ingredients.dataFailed;

export const getConstructorIngredients = (store: RootState) =>
  store.ingredients.constructorIngredients;
export const getCurrentBun = (store: RootState) => store.ingredients.currentBun;
export const getTotalPrice = (store: RootState) => store.ingredients.totalPrice;
