import { Middleware, MiddlewareAPI } from "redux";
import { getCookie, handleTokens } from "../../utils/utils";
import { updateToken } from "../api/api";
import { TwsActions, TwsUserActions } from "../types/wsActions";
import { AppDispatch, RootState } from "../store";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TwsActions | TwsUserActions,
  user?: boolean
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit.toString()) {
        console.log("init");
        if (user) {
          const accessToken = getCookie("token");
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError());
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            const refreshData = await updateToken();
            handleTokens(refreshData);
            const accessToken = getCookie("token");
            socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
          }
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        socket.onclose = (event) => {
          if (socket) {
            socket.close();
            socket = null;
            dispatch(onClose());
          }
        };
      }

      next(action);
    };
  };
};
