import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { memo } from "react";
import { Link } from "react-router-dom";

const AppHeader = memo(() => {
  return (
    <header className={`p-4 ${styles.header}`}>
      <nav className={`${styles.nav} ${styles.nav_type_links}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <Link
              to={"/"}
              className={`text text_type_main-default ${styles.link} ${styles.link_constructor}`}
            >
              Конструктор
            </Link>
          </li>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </li>
        </ul>
      </nav>

      <Logo />

      <nav className={`${styles.nav} ${styles.nav_type_lk}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <ProfileIcon type="secondary" />
            <Link
              to={"/profile"}
              className={`text text_type_main-default text_color_inactive ${styles.link}`}
            >
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default AppHeader;
