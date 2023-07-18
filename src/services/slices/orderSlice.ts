import { TConfirmedOrderResponse } from "../types/data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    GET_ORDER_NUMBER_REQUEST: (state) => {
      state.newOrderRequest = true;
    },
    GET_ORDER_NUMBER_SUCCESS: (
      state,
      { payload }: PayloadAction<TConfirmedOrderResponse>
    ) => {
      state.newOrderRequest = false;
      state.newOrderFailed = false;
      state.orderInfo = payload;
      state.newOrderSuccess = true;
    },
    GET_ORDER_NUMBER_FAILED: (state) => {
      state.newOrderFailed = true;
      state.newOrderRequest = false;
    },
    UPDATE_CONSTRUCTOR_EMPTINESS: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isConstructorEmpty = payload;
      state.newOrderSuccess = false;
    },
    CLEAR_NEW_ORDER_INFO: (state) => {
      state.orderInfo = null;
    },
  },
});

export default newOrderSlice.reducer;
export const {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  UPDATE_CONSTRUCTOR_EMPTINESS,
  CLEAR_NEW_ORDER_INFO,
} = newOrderSlice.actions;
