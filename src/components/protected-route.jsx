import { Navigate, useLocation } from "react-router-dom";
import { IS_USER_AUTHED } from "../services/actions/user";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, authHandler }) => {
  const location = useLocation();
  const isUserAuthed = localStorage.getItem(IS_USER_AUTHED);

  if (!isUserAuthed && !authHandler) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isUserAuthed && authHandler) {
    return <Navigate to="/" replace />;
  }

  return element;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  authHandler: PropTypes.bool,
};