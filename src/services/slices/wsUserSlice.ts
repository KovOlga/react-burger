import { TwsOrderResponse, TwsOrdersResponse } from "../types/data";
import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";

export type TInitialState = {
  wsConnected: boolean;
  orders: TwsOrderResponse[];
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsUserSlice = createSlice({
  name: "wsUser",
  initialState,
  reducers: {
    wsUserConnectionSuccess: (state) => {
      state.wsConnected = true;
    },

    wsUserConnectionError: (state) => {
      state.wsConnected = false;
    },

    wsUserConnectionClosed: (state) => {
      state.wsConnected = false;
    },

    wsUserFeedMessage: (
      state,
      {
        payload,
      }: PayloadAction<{
        orders: TwsOrderResponse[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
  },
});

export const wsUserStart = createAction("WS_USER_CONNECTION_START");
export const wsUserClose = createAction("wsUserConnectionClosed");

export const {
  wsUserConnectionSuccess,
  wsUserFeedMessage,
  wsUserConnectionClosed,
  wsUserConnectionError,
} = wsUserSlice.actions;

export default wsUserSlice.reducer;
