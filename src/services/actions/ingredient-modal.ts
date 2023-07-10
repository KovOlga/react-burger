import { TIngredientConstructor } from "../types/data";
import { AppThunk, AppDispatch } from "../types";

// export const TOGGLE_INGREDIENT_INFO_MODAL: "TOGGLE_INGREDIENT_INFO_MODAL" =
//   "TOGGLE_INGREDIENT_INFO_MODAL";

export const openIngredientModalThunk =
  (item: TIngredientConstructor): any =>
  (dispatch: any) => {
    return () => {
      localStorage.setItem("isIngredientInfoModalShown", "true");
      localStorage.setItem("currentIngredientShown", JSON.stringify(item));
    };
  };

export const closeIngredientModalThunk = (): any => (dispatch: any) => {
  return () => {
    localStorage.setItem("isIngredientInfoModalShown", "false");
    localStorage.removeItem("currentIngredientShown");
  };
};
