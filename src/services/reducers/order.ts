import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
} from "../actions/order";
import { TOrdersActions } from "../actions/order";
import { TConfirmedOrderResponse } from "../types/data";

export type TInitialState = {
  orderInfo: TConfirmedOrderResponse | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
  isConstructorEmpty: boolean;
  orderNumberSuccess: boolean;
};

const initialState: TInitialState = {
  orderInfo: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
  isConstructorEmpty: true,
  orderNumberSuccess: false,
};

export const orderNumberReducer = (
  state = initialState,
  action: TOrdersActions
): TInitialState => {
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
        orderInfo: action.res,
        orderNumberSuccess: true,
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return { ...state, orderNumberFailed: true, orderNumberRequest: false };
    }
    case UPDATE_CONSTRUCTOR_EMPTINESS: {
      return {
        ...state,
        isConstructorEmpty: action.state,
        orderNumberSuccess: false,
      };
    }
    default:
      return state;
  }
};
