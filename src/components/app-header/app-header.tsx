import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { memo, FC } from "react";
import { NavLink } from "react-router-dom";
import { PROFILE_ROUTE, HOME_ROUTE, FEED_ROUTE } from "../../utils/constants";

const AppHeader: FC = memo(() => {
  return (
    <header className={`pb-4 pt-4 ${styles.header}`}>
      <div className={styles.underlay}></div>
      <nav className={`${styles.nav} ${styles.nav_type_links}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              id="constructorLink"
              to={HOME_ROUTE}
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
              to={FEED_ROUTE}
              className={styles.link}
              style={({ isActive }) => ({
                color: isActive ? "#f2f2f3" : "#8585ad",
              })}
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default">Лента заказов</p>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      <Logo />

      <nav className={`${styles.nav} ${styles.nav_type_lk}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <NavLink
              to={PROFILE_ROUTE}
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
