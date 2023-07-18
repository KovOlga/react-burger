import {
  wsFeedConnectionSuccess,
  wsFeedMessage,
  wsFeedConnectionClosed,
  wsFeedConnectionError,
  wsFeedStart,
} from "../slices/wsFeedSlice";
import {
  wsUserConnectionSuccess,
  wsUserFeedMessage,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserStart,
} from "../slices/wsUserSlice";

export interface TwsActions {
  wsInit: typeof wsFeedStart;
  onOpen: typeof wsFeedConnectionSuccess;
  onClose: typeof wsFeedConnectionClosed;
  onError: typeof wsFeedConnectionError;
  onMessage: typeof wsFeedMessage;
}

export const wsActions: TwsActions = {
  wsInit: wsFeedStart,
  onOpen: wsFeedConnectionSuccess,
  onClose: wsFeedConnectionClosed,
  onError: wsFeedConnectionError,
  onMessage: wsFeedMessage,
};

export interface TwsUserActions {
  wsInit: typeof wsUserStart;
  onOpen: typeof wsUserConnectionSuccess;
  onClose: typeof wsUserConnectionClosed;
  onError: typeof wsUserConnectionError;
  onMessage: typeof wsUserFeedMessage;
}

export const wsUserActions: TwsUserActions = {
  wsInit: wsUserStart,
  onOpen: wsUserConnectionSuccess,
  onClose: wsUserConnectionClosed,
  onError: wsUserConnectionError,
  onMessage: wsUserFeedMessage,
};
