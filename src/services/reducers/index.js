import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderNumberReducer } from "./order";
import { userReducer } from "./user";
import { wsFeedReducer } from "./wsFeedReducer";
import { wsUserReducer } from "./wsUserReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderNumberReducer,
  user: userReducer,
  wsfeed: wsFeedReducer,
  wsUser: wsUserReducer,
});
