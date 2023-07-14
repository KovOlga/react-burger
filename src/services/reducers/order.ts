import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
  CLEAR_NEW_ORDER_INFO,
} from "../actions/order";
import { TOrdersActions } from "../actions/order";
import { TConfirmedOrderResponse } from "../types/data";

export type TInitialState = {
  orderInfo: TConfirmedOrderResponse | null;
  newOrderRequest: boolean;
  newOrderFailed: boolean;
  isConstructorEmpty: boolean;
  newOrderSuccess: boolean;
};

const initialState: TInitialState = {
  orderInfo: null,
  newOrderRequest: false,
  newOrderFailed: false,
  isConstructorEmpty: true,
  newOrderSuccess: false,
};

export const newOrderReducer = (
  state = initialState,
  action: TOrdersActions
): TInitialState => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        newOrderRequest: true,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        newOrderRequest: false,
        newOrderFailed: false,
        orderInfo: action.res,
        newOrderSuccess: true,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, newOrderFailed: true, newOrderRequest: false };
    }
    case UPDATE_CONSTRUCTOR_EMPTINESS: {
      return {
        ...state,
        isConstructorEmpty: action.state,
        newOrderSuccess: false,
      };
    }
    case CLEAR_NEW_ORDER_INFO: {
      return {
        ...state,
        orderInfo: null,
      };
    }
    default:
      return state;
  }
};
