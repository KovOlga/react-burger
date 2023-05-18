import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  LayoutPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
} from "../../pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
