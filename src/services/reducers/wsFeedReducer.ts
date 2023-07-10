import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED,
} from "../action-types/wsActionTypes";
import { TwsOrdersResponse } from "../types/data";
import { TWsActions } from "../actions/wsActions";

export type TInitialState = {
  wsConnected: boolean;
  orders: TwsOrdersResponse;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsFeedReducer = (
  state = initialState,
  action: TWsActions
): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_FEED:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};
