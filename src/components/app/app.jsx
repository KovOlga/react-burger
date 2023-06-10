import { Routes, Route, useLocation } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  LayoutPage,
  RegisterPage,
  ForgotPassword,
  ResetPassword,
  ProfilePage,
  OrdersPage,
  IngredientPage,
  IngredientModalPage,
  FeedPage,
  FeedModalPage,
  OrderPage,
  OrderModalPage,
} from "../../pages";
import { ProtectedRouteElement } from "../protected-route";
import { NotFoundPage } from "../../pages/not-found";
import ProfileForm from "../profile-form/profile-form";

const App = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />

          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRouteElement element={<OrderPage />} />}
          />

          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderPage />} />

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
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModalPage />} />
          <Route path="/feed/:id" element={<FeedModalPage />} />
          <Route path="/profile/orders/:id" element={<OrderModalPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
