import { v4 as uuidv4 } from "uuid";
import { AppThunk } from "../store";
import {
  SET_CURRENT_BUN,
  UPDATE_BUN_COUNTER,
  UPDATE_INGREDIENT_COUNTER,
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
} from "../slices/ingredientsSlice";

export const addConstructorItemThunk =
  (itemId: string): AppThunk =>
  (dispatch) => {
    const uuid: string = uuidv4();
    dispatch(ADD_CONSTRUCTOR_ITEM({ itemId, uuid }));
    dispatch(UPDATE_INGREDIENT_COUNTER(itemId));
  };

export const deleteConstructorItemThunk =
  (itemId: string, uniqueId: string): AppThunk =>
  (dispatch) => {
    dispatch(DELETE_CONSTRUCTOR_ITEM(uniqueId));
    dispatch(UPDATE_INGREDIENT_COUNTER(itemId));
  };

export const swapConstructorBunAction =
  (itemId: string): AppThunk =>
  (dispatch) => {
    dispatch(SET_CURRENT_BUN(itemId));
    dispatch(UPDATE_BUN_COUNTER(itemId));
  };
