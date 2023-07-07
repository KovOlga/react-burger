import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_GET_USER_ORDERS,
} from "../action-types/wsActionTypes";

interface IwsFeedConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
interface IwsFeedConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
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
}

export type TWsActions =
  | IwsFeedConnectionStart
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
