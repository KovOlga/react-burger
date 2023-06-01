export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";
export const TOGGLE_INGREDIENT_INFO_MODAL = "TOGGLE_INGREDIENT_INFO_MODAL";

export const openIngredientModalAction = (item) => {
  return (dispatch) => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
    localStorage.setItem("isIngredientInfoModalShown", true);
    localStorage.setItem("currentIngredientShown", JSON.stringify(item));
  };
};

export const closeIngredientModalAction = () => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
    dispatch({ type: CLEAR_CURRENT_INGREDIENT });
    localStorage.setItem("isIngredientInfoModalShown", false);
    localStorage.removeItem("currentIngredientShown");
  };
};
