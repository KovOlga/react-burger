import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_CLOSED,
} from "../action-types/wsActionTypes";

export const wsFeedConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsFeedConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsUserConnectionStart = () => {
  return {
    type: WS_USER_CONNECTION_START,
  };
};

export const wsUserConnectionClosed = () => {
  return {
    type: WS_USER_CONNECTION_CLOSED,
  };
};
