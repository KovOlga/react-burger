import { Navigate } from "react-router-dom";
import { IS_USER_AUTHED } from "../utils/constants";

export const ProtectedRouteElementAuthed = ({ element }) => {
  const isUserAuthed = localStorage.getItem(IS_USER_AUTHED);

  if (isUserAuthed) {
    return <Navigate to="/" replace />;
  }

  return element;
};
