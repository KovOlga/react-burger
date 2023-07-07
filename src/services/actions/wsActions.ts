import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
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

export type TUserActions =
  | IwsFeedConnectionStart
  | IwsFeedConnectionClosed
  | IwsUserConnectionStart
  | IwsUserConnectionClosed;

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
