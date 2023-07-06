import { TIngredient } from "../types/data";
export const TOGGLE_INGREDIENT_INFO_MODAL = "TOGGLE_INGREDIENT_INFO_MODAL";

export const openIngredientModalAction = (item: TIngredient) => {
  return () => {
    localStorage.setItem("isIngredientInfoModalShown", "true");
    localStorage.setItem("currentIngredientShown", JSON.stringify(item));
  };
};

export const closeIngredientModalAction = () => {
  return () => {
    localStorage.setItem("isIngredientInfoModalShown", "false");
    localStorage.removeItem("currentIngredientShown");
  };
};
