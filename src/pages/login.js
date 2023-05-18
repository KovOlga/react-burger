import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          placeholder="Пароль"
        />
        <Button htmlType="button" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link className={styles.link} to={"/register"}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link className={styles.link} to={"/forgot-password"}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
