import { applyMiddleware, createStore, compose } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleware";
import thunk from "redux-thunk";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED,
  WS_SEND_MESSAGE,
  WS_USER_CONNECTION_START,
  WS_USER_SEND_MESSAGE,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_GET_USER_ORDERS,
} from "./action-types/wsActionTypes";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUserUrl = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_FEED,
};

const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  wsSendMessage: WS_USER_SEND_MESSAGE,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_GET_USER_ORDERS,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const user = true;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(wsUserUrl, wsUserActions, user)
  )
);

export const initStore = (initialState = {}) =>
  createStore(rootReducer, initialState, enhancer);
