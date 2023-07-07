import { store } from "../..";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrdersActions } from "../actions/order";
import { TWsActions } from "../actions/wsActions";
import { TUserActions } from "../actions/user";

type TApplicationActions =
  | TIngredientsActions
  | TConstructorActions
  | TOrdersActions
  | TWsActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
