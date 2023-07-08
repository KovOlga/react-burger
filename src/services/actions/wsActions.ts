import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_GET_USER_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_FEED,
} from "../action-types/wsActionTypes";
import { TOrder } from "../types/data";

interface IwsFeedConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
interface IwsFeedConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IwsGetFeed {
  readonly type: typeof WS_GET_FEED;
  payload: TOrder[];
}
interface IwsFeedConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IwsFeedConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
interface IwsUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
}
interface IwsUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
interface IwsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
interface IwsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}
interface IwsGetUserOrders {
  readonly type: typeof WS_GET_USER_ORDERS;
  payload: TOrder[];
}

export type TWsActions =
  | IwsFeedConnectionStart
  | IwsFeedConnectionSuccess
  | IwsGetFeed
  | IwsFeedConnectionError
  | IwsFeedConnectionClosed
  | IwsUserConnectionStart
  | IwsUserConnectionClosed
  | IwsUserConnectionSuccess
  | IwsUserConnectionError
  | IwsGetUserOrders;

export const wsFeedConnectionStart = (): IwsFeedConnectionStart => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsFeedConnectionClosed = (): IwsFeedConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsUserConnectionStart = (): IwsUserConnectionStart => {
  return {
    type: WS_USER_CONNECTION_START,
  };
};

export const wsUserConnectionClosed = (): IwsUserConnectionClosed => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};
