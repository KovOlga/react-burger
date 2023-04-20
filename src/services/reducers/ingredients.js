import { DELETE_INGREDIENT } from "../actions";
import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
} from "../actions";

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
  constructorIngredients: [],
  currentIngredient: {},
  order: {},
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
    // case ADD_INGREDIENT:
    //   return [
    //     ...state,
    //     {
    //       action,
    //     },
    //   ];
    // case DELETE_INGREDIENT:
    //   return {
    //     ...state,
    //     data: [...state.data].filter((item) => item._id !== action.id),
    //   };
    default:
      return state;
  }
};
