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
  LogoutPage,
  OrdersPage,
} from "../../pages";
import { ProvideAuth } from "../../services/actions";

//iiiiiiiiiiiiiiii

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<PersonalAccountPage />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/logout" element={<LogoutPage />} />
              <Route path="/profile/orders" element={<OrdersPage />} />
              {/* <Route path="/profile/orders/:id" element={<OrdersPage />} /> */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </ProvideAuth>
  );
};

export default App;
