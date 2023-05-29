import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {
  const isUserAuthed = useSelector((store) => store.user.isUserAuthed);
  const location = useLocation();

  if (!isUserAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return isUserAuthed && element;
};
