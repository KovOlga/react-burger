import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  LayoutPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  ProfilePage,
  PersonalAccountPage,
  OrdersPage,
} from "../../pages";
import { ProtectedRouteElementNotAuthed } from "../protected-route-not-authed";
import { ProtectedRouteElementAuthed } from "../protected-route-authed";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={<ProtectedRouteElementAuthed element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRouteElementAuthed element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElementAuthed element={<ForgotPassword />} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElementAuthed element={<ResetPassword />} />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElementNotAuthed
                element={<PersonalAccountPage />}
              />
            }
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/orders" element={<OrdersPage />} />
            {/* <Route path="/profile/orders/:id" element={<OrdersPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
