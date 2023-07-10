import { Dispatch } from "redux";
import { TIngredient, TIngredientConstructor } from "../types/data";
import { AppThunk, AppDispatch } from "../types";
import { getIngredientsList } from "../api/api";

export const GET_INGREDIENT_REQUEST: "GET_INGREDIENT_REQUEST" =
  "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS: "GET_INGREDIENT_SUCCESS" =
  "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FAILED: "GET_INGREDIENT_FAILED" =
  "GET_INGREDIENT_FAILED";

interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENT_REQUEST;
}

interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENT_SUCCESS;
  data: TIngredientConstructor[];
}

interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENT_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENT_REQUEST,
});

export const getIngredientsSuccessAction = (
  data: TIngredientConstructor[]
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENT_SUCCESS,
  data,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENT_FAILED,
});

export const getIngredients = (): any => (dispatch: any) => {
  return () => {
    dispatch(getIngredientsAction());
    getIngredientsList()
      .then(({ data }) => {
        dispatch(getIngredientsSuccessAction(data));
      })
      .catch((e) => {
        dispatch(getIngredientsFailedAction());
      });
  };
};
