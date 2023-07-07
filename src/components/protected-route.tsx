import { Navigate, useLocation } from "react-router-dom";
import { IS_USER_AUTHED } from "../services/actions/user";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/constants";
import { FC } from "react";

interface ProtectedRouteElementProps {
  element: JSX.Element;
  authHandler?: boolean;
}

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({
  element,
  authHandler,
}) => {
  const location = useLocation();
  const isUserAuthed = localStorage.getItem(IS_USER_AUTHED);

  if (!isUserAuthed && !authHandler) {
    return <Navigate to={LOGIN_ROUTE} replace state={{ from: location }} />;
  }

  if (isUserAuthed && authHandler) {
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return element;
};
