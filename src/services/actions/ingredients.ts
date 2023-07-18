import { AppThunk } from "../store";
import { getIngredientsList } from "../api/api";
import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
} from "../slices/ingredientsSlice";

export const getIngredients = (): AppThunk => (dispatch) => {
  dispatch(GET_INGREDIENT_REQUEST());
  return getIngredientsList()
    .then(({ data }) => {
      dispatch(GET_INGREDIENT_SUCCESS(data));
    })
    .catch((e) => {
      dispatch(GET_INGREDIENT_FAILED());
    });
};
