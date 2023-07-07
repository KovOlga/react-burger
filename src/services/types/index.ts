import { store } from "../..";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TIngredientsActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";

type TApplicationActions = TIngredientsActions | TConstructorActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
