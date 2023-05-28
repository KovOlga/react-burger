import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/actions";

export const PersonalAccountPage = () => {
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    console.log("logout");
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <NavLink
              to={"/profile"}
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
              to={"/profile/orders"}
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
      </div>
      <Outlet />
    </div>
  );
};
