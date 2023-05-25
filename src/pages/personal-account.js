import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const PersonalAccountPage = () => {
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
            <NavLink
              to={"/profile/logout"}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
              className={`text text_type_main-medium ${styles.link}`}
            >
              Выход
            </NavLink>
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
