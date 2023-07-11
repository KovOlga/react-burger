import styles from "./profile.module.css";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { logoutUserThunk } from "../services/actions/user";
import {
  PROFILE_ROUTE,
  PROFILE_ORDERS_ROUTE,
  LOGIN_ROUTE,
} from "../utils/constants";
import { FC } from "react";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutUser = () => {
    dispatch(logoutUserThunk());
    navigate(LOGIN_ROUTE);
  };

  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <NavLink
              to={PROFILE_ROUTE}
              end
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
              className={`text text_type_main-medium ${styles.link}`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              to={PROFILE_ORDERS_ROUTE}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
              className={`text text_type_main-medium ${styles.link}`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <p
              onClick={onLogoutUser}
              className={`text text_type_main-medium text_color_inactive ${styles.logout}`}
            >
              Выход
            </p>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Outlet />
    </main>
  );
};
