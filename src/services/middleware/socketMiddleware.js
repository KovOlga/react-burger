import { getCookie, handleTokens } from "../../utils/utils";
import Api from "../api/api";

const api = new Api();

export const socketMiddleware = (wsUrl, wsActions, user) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        if (user) {
          const accessToken = getCookie("token");
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            const refreshData = await api.updateToken();
            handleTokens(refreshData);
            const accessToken = getCookie("token");
            socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
          }
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          socket.close();
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
