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
} from "../actions";

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  currentIngredient: {},

  currentBun: {},
  constructorIngredients: [],

  orderIngredients: [],
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,

  totalPrice: 100,

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
          let uniqueId = uuidv4();

          return { ...item, uniqueId: uniqueId };
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
    case ADD_CONSTRUCTOR_ITEM: {
      const addedItem = state.data.find((item) => item._id === action.item._id);
      let uniqueId = uuidv4();
      const updatedItem = { ...addedItem, uniqueId };

      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, updatedItem],
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item) => item.uniqueId !== action.itemId
        ),
      };
    }
    default:
      return state;
  }
};