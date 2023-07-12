import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
} from "../actions/ingredients";

import {
  SET_CURRENT_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_TOTAL_PRICE,
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_BUN_COUNTER,
  SORT_DRAGGING_ITEM,
} from "../actions/constructor";

import { CLEAR_CONSTRUCTOR, RESET_COUNTERS } from "../actions/order";
import { TIngredientConstructor } from "../types/data";
import { TIngredientsActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";
import { TOrdersActions } from "../actions/order";

export type TInitialState = {
  data: TIngredientConstructor[];
  dataRequest: boolean;
  dataFailed: boolean;
  currentBun: TIngredientConstructor | null | undefined;
  constructorIngredients: TIngredientConstructor[];
  totalPrice: number;
  isIngredientInfoModalShown: boolean;
};

const initialState: TInitialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  currentBun: null,
  constructorIngredients: [],

  totalPrice: 0,

  isIngredientInfoModalShown: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions | TConstructorActions | TOrdersActions
): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENT_REQUEST: {
      return {
        ...state,
        dataRequest: true,
      };
    }
    case GET_INGREDIENT_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        data: action.data.map((item) => {
          return { ...item, counter: 0 };
        }),
      };
    }
    case GET_INGREDIENT_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }
    case SET_CURRENT_BUN: {
      return {
        ...state,
        currentBun: state.data.find((item) => item._id === action.itemId),
      };
    }
    case UPDATE_TOTAL_PRICE: {
      let ingredientsPrice = 0;
      state.constructorIngredients.forEach((item) => {
        ingredientsPrice = ingredientsPrice + item.price;
      });
      const totalPrice =
        (!state.currentBun ? 0 : state.currentBun.price * 2) + ingredientsPrice;
      return {
        ...state,
        totalPrice: totalPrice,
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      const addedItem = state.data.find((item) => item._id === action.itemId);
      if (addedItem) {
        const uniqueId = action.uuid;
        const updatedItem = { ...addedItem, uniqueId };

        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            updatedItem,
          ],
        };
      } else {
        return { ...state };
      }
    }
    case UPDATE_INGREDIENT_COUNTER: {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient._id === action.itemId) {
            const counter = state.constructorIngredients.filter((item) => {
              return item._id === action.itemId;
            }).length;
            return { ...ingredient, counter: counter };
          }
          return ingredient;
        }),
      };
    }
    case UPDATE_BUN_COUNTER: {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient.type === "bun") {
            return ingredient._id === action.itemId
              ? { ...ingredient, counter: 2 }
              : { ...ingredient, counter: 0 };
          }
          return ingredient;
        }),
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item) => item.uniqueId !== action.uniqueId
        ),
      };
    }
    case SORT_DRAGGING_ITEM: {
      const newConstructorArr = state.constructorIngredients.map(
        (item) => item
      );

      newConstructorArr[action.hoverIndex] = newConstructorArr.splice(
        action.dragIndex,
        1,
        newConstructorArr[action.hoverIndex]
      )[0];

      return {
        ...state,
        constructorIngredients: newConstructorArr,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        currentBun: null,
        constructorIngredients: [],
      };
    }
    case RESET_COUNTERS: {
      return {
        ...state,
        data: state.data.map((item) => {
          return { ...item, counter: 0 };
        }),
      };
    }
    default:
      return state;
  }
};
