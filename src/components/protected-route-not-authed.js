import { Navigate, useLocation } from "react-router-dom";
import { IS_USER_AUTHED } from "../utils/constants";

export const ProtectedRouteElementNotAuthed = ({ element }) => {
  const location = useLocation();
  const isUserAuthed = localStorage.getItem(IS_USER_AUTHED);

  if (!isUserAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return isUserAuthed && element;
};
