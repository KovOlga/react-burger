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
import { ProtectedRouteElement } from "../protected-route";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                element={<LoginPage />}
                authHandler={true}
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                element={<RegisterPage />}
                authHandler={true}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                element={<ForgotPassword />}
                authHandler={true}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                element={<ResetPassword />}
                authHandler={true}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement element={<PersonalAccountPage />} />
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
