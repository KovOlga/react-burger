import styles from "./login.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginPage = () => {
  const [value, setValue] = useState({
    email: "bob@example.com",
    password: "password",
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
        <EmailInput onChange={onChange} value={value.mail} name={"email"} />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          placeholder="Логин"
        />
        <Button htmlType="button" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <span>Зарегистрироваться</span>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <span>Восстановить пароль</span>
        </p>
      </div>
    </div>
  );
};
