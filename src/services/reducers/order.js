import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  ORDER_NUMBER_IS_EMPTY,
} from "../actions";

const initialState = {
  orderInfo: {},
  orderNumberRequest: false,
  orderNumberFailed: false,
  orderNumberIsEmpty: true,
  orderNumberSuccess: false,
};

export const orderNumberReducer = (state = initialState, action) => {
  switch (action.type) {
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
        orderInfo: action.payload,
        orderNumberSuccess: true,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, orderNumberFailed: true, orderNumberRequest: false };
    }
    case ORDER_NUMBER_IS_EMPTY: {
      return {
        ...state,
        orderNumberIsEmpty: action.payload,
        orderNumberSuccess: false,
      };
    }
    default:
      return state;
  }
};
