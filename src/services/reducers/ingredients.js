import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
  SET_CURRENT_INGREDIENT,
  SET_CURRENT_BUN,
  SET_CONSTRUCTOR_INGREDIENTS,
  CLEAR_CURRENT_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../actions";

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  constructorIngredients: [],
  currentBun: {},
  currentIngredient: {},
  orderIngredients: [],
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
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
        data: action.data,
      };
    }
    case GET_INGREDIENT_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }
    case SET_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: action.payload };
    }
    case SET_CURRENT_BUN: {
      return { ...state, currentBun: action.payload };
    }
    case SET_CONSTRUCTOR_INGREDIENTS: {
      return { ...state, constructorIngredients: action.payload };
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: false,
        orderNumber: action.payload,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, orderNumberFailed: true, orderNumberRequest: false };
    }
    case CLEAR_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: {} };
    }
    default:
      return state;
  }
};
