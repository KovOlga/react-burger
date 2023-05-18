import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export const ProfilePage = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list__item}>
            <NavLink
              activeClassName={styles.link_active}
              className={`text text_type_main-medium ${styles.link}`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              activeClassName={styles.link_active}
              className={`text text_type_main-medium ${styles.link}`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              activeClassName={styles.link_active}
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
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          value={value.name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />

        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-2"
        />

        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          extraClass="mb-2"
          placeholder="Пароль"
          icon="EditIcon"
        />
      </div>
    </div>
  );
};
