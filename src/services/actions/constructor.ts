import { v4 as uuidv4 } from "uuid";
import { AppThunk, AppDispatch } from "../types";

export const SET_CURRENT_BUN: "SET_CURRENT_BUN" = "SET_CURRENT_BUN";
export const ADD_CONSTRUCTOR_ITEM: "ADD_CONSTRUCTOR_ITEM" =
  "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM: "DELETE_CONSTRUCTOR_ITEM" =
  "DELETE_CONSTRUCTOR_ITEM";
export const UPDATE_INGREDIENT_COUNTER: "UPDATE_INGREDIENT_COUNTER" =
  "UPDATE_INGREDIENT_COUNTER";
export const UPDATE_BUN_COUNTER: "UPDATE_BUN_COUNTER" = "UPDATE_BUN_COUNTER";

export const SORT_DRAGGING_ITEM: "SORT_DRAGGING_ITEM" = "SORT_DRAGGING_ITEM";
export const UPDATE_TOTAL_PRICE: "UPDATE_TOTAL_PRICE" = "UPDATE_TOTAL_PRICE";

interface IAddConstructorItemAction {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly itemId: string;
  readonly uuid: string;
}

interface IUpdateIngredientCounterAction {
  readonly type: typeof UPDATE_INGREDIENT_COUNTER;
  readonly itemId: string;
}

interface IDeleteConstructorItemAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
  readonly uniqueId: string;
}

interface ISetCurrentBunAction {
  readonly type: typeof SET_CURRENT_BUN;
  readonly itemId: string;
}

interface IUpdateBunCounterAction {
  readonly type: typeof UPDATE_BUN_COUNTER;
  readonly itemId: string;
}

interface IUpdateTotalPriceAction {
  readonly type: typeof UPDATE_TOTAL_PRICE;
}

interface ISortDraggingItemAction {
  readonly type: typeof SORT_DRAGGING_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TConstructorActions =
  | IAddConstructorItemAction
  | IUpdateIngredientCounterAction
  | IDeleteConstructorItemAction
  | ISetCurrentBunAction
  | IUpdateBunCounterAction
  | IUpdateTotalPriceAction
  | ISortDraggingItemAction;

export const addConstructorItemAction = (
  itemId: string,
  uuid: string
): IAddConstructorItemAction => ({
  type: ADD_CONSTRUCTOR_ITEM,
  itemId,
  uuid,
});

export const updateIngredientCounterAction = (
  itemId: string
): IUpdateIngredientCounterAction => ({
  type: UPDATE_INGREDIENT_COUNTER,
  itemId,
});

export const deleteConstructorItemAction = (
  uniqueId: string
): IDeleteConstructorItemAction => ({
  type: DELETE_CONSTRUCTOR_ITEM,
  uniqueId,
});

export const setCurrentBunAction = (itemId: string): ISetCurrentBunAction => ({
  type: SET_CURRENT_BUN,
  itemId,
});

export const updateBunCounterAction = (
  itemId: string
): IUpdateBunCounterAction => ({
  type: UPDATE_BUN_COUNTER,
  itemId,
});

export const updateTotalPriceAction = (): IUpdateTotalPriceAction => ({
  type: UPDATE_TOTAL_PRICE,
});

export const sortDraggingItemAction = (
  dragIndex: number,
  hoverIndex: number
): ISortDraggingItemAction => ({
  type: SORT_DRAGGING_ITEM,
  dragIndex,
  hoverIndex,
});

export const addConstructorItemThunk: AppThunk =
  (itemId) => (dispatch: AppDispatch) => {
    const uuid: string = uuidv4();
    return () => {
      dispatch(addConstructorItemAction(itemId, uuid));
      dispatch(updateIngredientCounterAction(itemId));
    };
  };

export const deleteConstructorItemThunk: AppThunk =
  (itemId, uniqueId) => (dispatch: AppDispatch) => {
    return () => {
      dispatch(deleteConstructorItemAction(uniqueId));
      dispatch(updateIngredientCounterAction(itemId));
    };
  };

export const swapConstructorBunAction: AppThunk =
  (itemId) => (dispatch: AppDispatch) => {
    return () => {
      dispatch(setCurrentBunAction(itemId));
      dispatch(updateBunCounterAction(itemId));
    };
  };
