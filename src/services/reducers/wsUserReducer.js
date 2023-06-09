import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
} from "../action-types/wsActionTypes";

const initialState = {
  wsConnected: false,
  userOrders: [],
};

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload.orders,
      };

    default:
      return state;
  }
};
