import { TIngredientCustom } from "../types/data";
import { AppThunk, AppDispatch } from "../types";

// export const TOGGLE_INGREDIENT_INFO_MODAL: "TOGGLE_INGREDIENT_INFO_MODAL" =
//   "TOGGLE_INGREDIENT_INFO_MODAL";

export const openIngredientModalThunk: AppThunk =
  (item: TIngredientCustom) => (dispatch: AppDispatch) => {
    return () => {
      localStorage.setItem("isIngredientInfoModalShown", "true");
      localStorage.setItem("currentIngredientShown", JSON.stringify(item));
    };
  };

export const closeIngredientModalThunk: AppThunk =
  () => (dispatch: AppDispatch) => {
    return () => {
      localStorage.setItem("isIngredientInfoModalShown", "false");
      localStorage.removeItem("currentIngredientShown");
    };
  };
