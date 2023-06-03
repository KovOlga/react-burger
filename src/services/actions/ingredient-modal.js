export const TOGGLE_INGREDIENT_INFO_MODAL = "TOGGLE_INGREDIENT_INFO_MODAL";

export const openIngredientModalAction = (item) => {
  return (dispatch) => {
    localStorage.setItem("isIngredientInfoModalShown", true);
    localStorage.setItem("currentIngredientShown", JSON.stringify(item));
  };
};

export const closeIngredientModalAction = () => {
  return (dispatch) => {
    localStorage.setItem("isIngredientInfoModalShown", false);
    localStorage.removeItem("currentIngredientShown");
  };
};
