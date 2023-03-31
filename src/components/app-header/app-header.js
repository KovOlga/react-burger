import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { memo } from "react";

const AppHeader = memo(() => {
  const random = Math.random() * 3;
  console.log(`AppHeader ${random}`);
  return (
    <header className={`p-4 ${styles.header}`}>
      <nav className={`${styles.nav} ${styles.nav_type_links}`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item}  pb-4 pt-4 pl-5 pr-5`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
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
            <p className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default AppHeader;
