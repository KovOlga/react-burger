import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import ingredientsSlice from "./slices/ingredientsSlice";
import newOrderSlice from "./slices/orderSlice";
import userSlice from "./slices/userSlice";
import wsFeedSlice from "./slices/wsFeedSlice";
import wsUserSlice from "./slices/wsUserSlice";
import { wsActions, wsUserActions } from "./types/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUserUrl = "wss://norma.nomoreparties.space/orders";

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  newOrder: newOrderSlice,
  user: userSlice,
  wsFeed: wsFeedSlice,
  wsUser: wsUserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUserUrl, wsUserActions, true)
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
