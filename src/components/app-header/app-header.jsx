import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const AppHeader = memo(() => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <nav className={`${styles.nav} ${styles.nav_type_links}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"/"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Конструктор</p>
                </>
              )}
            </NavLink>
          </li>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"*"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Logo />

      <nav className={`${styles.nav} ${styles.nav_type_lk}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={"/profile"}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Личный кабинет</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default AppHeader;
