import { v4 as uuidv4 } from "uuid";
import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
  SET_CURRENT_INGREDIENT,
  SET_CURRENT_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  CLEAR_CURRENT_INGREDIENT,
  UPDATE_TOTAL_PRICE,
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_BUN_COUNTER,
} from "../actions";

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  currentIngredient: {},

  currentBun: {},
  constructorIngredients: [],

  orderIngredients: [],

  totalPrice: 0,

  ingredientsPrice: {},

  //popupCurrentContent: "",
};

export const ingredientsReducer = (state = initialState, action) => {
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
    case SET_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: action.payload };
    }
    case CLEAR_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: {} };
    }
    case SET_CURRENT_BUN: {
      return {
        ...state,
        currentBun: state.data.find((item) => item._id === action.item._id),
      };
    }
    case UPDATE_TOTAL_PRICE: {
      let ingredientsPrice = 0;
      state.constructorIngredients.forEach((item) => {
        ingredientsPrice = ingredientsPrice + item.price;
      });
      const totalPrice =
        (state.currentBun.price === undefined
          ? 0
          : state.currentBun.price * 2) + ingredientsPrice;
      return {
        ...state,
        totalPrice: totalPrice,
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      const addedItem = state.data.find((item) => item._id === action.item._id);
      let uniqueId = uuidv4();
      const updatedItem = { ...addedItem, uniqueId };

      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, updatedItem],
      };
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
      console.log(action);
      console.log(state.currentBun);
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient.type === "bun") {
            return ingredient._id === action.itemId
              ? { ...ingredient, counter: 1 }
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
    default:
      return state;
  }
};
