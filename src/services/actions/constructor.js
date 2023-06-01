import { v4 as uuidv4 } from "uuid";

export const SET_CURRENT_BUN = "SET_CURRENT_BUN";
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";
export const UPDATE_INGREDIENT_COUNTER = "UPDATE_INGREDIENT_COUNTER";
export const UPDATE_BUN_COUNTER = "UPDATE_BUN_COUNTER";

export const SORT_DRAGGING_ITEM = "SORT_DRAGGING_ITEM";
export const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

export const addConstructorItemAction = (itemId) => {
  const uuid = uuidv4();
  return (dispatch) => {
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, itemId, uuid });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };
};

export const deleteConstructorItemAction = (itemId, uniqueId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, uniqueId });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };
};

export const swapConstructorBunAction = (itemId) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_BUN, itemId });
    dispatch({ type: UPDATE_BUN_COUNTER, itemId });
  };
};
