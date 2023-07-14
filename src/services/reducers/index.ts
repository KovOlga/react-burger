import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { newOrderReducer } from "./order";
import { userReducer } from "./user";
import { wsFeedReducer } from "./wsFeedReducer";
import { wsUserReducer } from "./wsUserReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  newOrder: newOrderReducer,
  user: userReducer,
  wsfeed: wsFeedReducer,
  wsUser: wsUserReducer,
});
