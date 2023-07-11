import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_FEED,
  WS_USER_CONNECTION_START,
  WS_USER_SEND_MESSAGE,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_GET_USER_ORDERS,
} from "../action-types/wsActionTypes";

export interface TwsActions {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_FEED;
}

export interface TwsUserActions {
  wsInit: typeof WS_USER_CONNECTION_START;
  wsSendMessage: typeof WS_USER_SEND_MESSAGE;
  onOpen: typeof WS_USER_CONNECTION_SUCCESS;
  onClose: typeof WS_USER_CONNECTION_CLOSED;
  onError: typeof WS_USER_CONNECTION_ERROR;
  onMessage: typeof WS_GET_USER_ORDERS;
}
