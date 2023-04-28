import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderNumberReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderNumberReducer,
});
