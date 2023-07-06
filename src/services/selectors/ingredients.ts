export const getData = (store) => store.ingredients.data;
export const getDataRequest = (store) => store.ingredients.dataRequest;
export const getDataFailed = (store) => store.ingredients.dataFailed;

export const getConstructorIngredients = (store) =>
  store.ingredients.constructorIngredients;
export const getCurrentBun = (store) => store.ingredients.currentBun;
export const getTotalPrice = (store) => store.ingredients.totalPrice;
