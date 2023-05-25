import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderNumberReducer } from "./order";
import { authReducer } from "./login";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderNumberReducer,
  login: authReducer,
});
