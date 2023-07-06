import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
} from "../actions/order";

const initialState = {
  orderInfo: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
  isConstructorEmpty: true,
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
    case UPDATE_CONSTRUCTOR_EMPTINESS: {
      return {
        ...state,
        isConstructorEmpty: action.payload,
        orderNumberSuccess: false,
      };
    }
    default:
      return state;
  }
};
