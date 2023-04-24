import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
} from "../actions";

const initialState = {
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
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
        orderNumber: action.payload,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, orderNumberFailed: true, orderNumberRequest: false };
    }
    default:
      return state;
  }
};
