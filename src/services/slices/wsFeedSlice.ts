import { TwsOrderResponse } from "../types/data";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  wsConnected: boolean;
  orders: TwsOrderResponse[];
  updatedOrders: any;
  total: number;
  totalToday: number;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  updatedOrders: [],
  total: 0,
  totalToday: 0,
};

export const wsFeedSlice = createSlice({
  name: "wsFeed",
  initialState,
  reducers: {
    wsFeedConnectionSuccess: (state) => {
      state.wsConnected = true;
    },

    wsFeedConnectionError: (state) => {
      state.wsConnected = false;
    },

    wsFeedConnectionClosed: (state) => {
      state.wsConnected = false;
    },

    wsFeedMessage: (
      state,
      {
        payload,
      }: PayloadAction<{
        orders: TwsOrderResponse[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = payload.orders.map((ingredient) => {
        return { ...ingredient, counter: 0 };
      });
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
  },
});

export const wsFeedStart = createAction("WS_CONNECTION_START");
export const wsFeedClose = createAction("WS_CONNECTION_CLOSED");

export const {
  wsFeedConnectionSuccess,
  wsFeedMessage,
  wsFeedConnectionClosed,
  wsFeedConnectionError,
} = wsFeedSlice.actions;

export default wsFeedSlice.reducer;
