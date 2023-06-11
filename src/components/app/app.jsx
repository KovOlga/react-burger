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
import {
  PROFILE_ROUTE,
  HOME_ROUTE,
  FEED_ROUTE,
  INGREDIENTS_ID_ROUTE,
  PROFILE_ORDERS_ROUTE,
  PROFILE_ORDERS_ID_ROUTE,
  FEED_ID_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../../utils/constants";

const App = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={HOME_ROUTE} element={<LayoutPage />}>
          <Route index path={HOME_ROUTE} element={<HomePage />} />
          <Route path={INGREDIENTS_ID_ROUTE} element={<IngredientPage />} />

          <Route
            path={PROFILE_ROUTE}
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          >
            <Route index element={<ProfileForm />} />
            <Route path={PROFILE_ORDERS_ROUTE} element={<OrdersPage />} />
          </Route>
          <Route
            path={PROFILE_ORDERS_ID_ROUTE}
            element={<ProtectedRouteElement element={<OrderPage />} />}
          />

          <Route path={FEED_ROUTE} element={<FeedPage />} />
          <Route path={FEED_ID_ROUTE} element={<OrderPage />} />

          <Route
            path={LOGIN_ROUTE}
            element={
              <ProtectedRouteElement
                element={<LoginPage />}
                authHandler={true}
              />
            }
          />
          <Route
            path={REGISTER_ROUTE}
            element={
              <ProtectedRouteElement
                element={<RegisterPage />}
                authHandler={true}
              />
            }
          />
          <Route
            path={FORGOT_PASSWORD_ROUTE}
            element={
              <ProtectedRouteElement
                element={<ForgotPassword />}
                authHandler={true}
              />
            }
          />
          <Route
            path={RESET_PASSWORD_ROUTE}
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
          <Route
            path={INGREDIENTS_ID_ROUTE}
            element={<IngredientModalPage />}
          />
          <Route path={FEED_ID_ROUTE} element={<FeedModalPage />} />
          <Route path={PROFILE_ORDERS_ID_ROUTE} element={<OrderModalPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
