import styles from "./profile.module.css";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/actions/user";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutUser = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <main className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <NavLink
              to={"/profile"}
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
      </nav>
      <Outlet />
    </main>
  );
};
