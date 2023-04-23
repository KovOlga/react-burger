import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
  SET_CURRENT_INGREDIENT,
  SET_INITIAL_BUN,
  SET_INITIAL_CONSTRUCTOR_INGREDIENTS,
  SET_CURRENT_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  CLEAR_CURRENT_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  CHANGE_CURRENT_BUN,
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
        data: action.data,
      };
    }
    case GET_INGREDIENT_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
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
    case SET_INITIAL_BUN: {
      return {
        ...state,
        currentBun: action.initialBun,
      };
    }
    case SET_INITIAL_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorIngredients: action.payload,
      };
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
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          ...state.data.filter((item) => item._id === action.item._id),
        ],
      };
    }
    // case CHANGE_CURRENT_BUN: {
    //   return {
    //     ...state,
    //     currentBun: {
    //       ...state.data.filter((item) => item._id === action.item._id),
    //     },
    //   };
    // }
    default:
      return state;
  }
};
