import styles from "./register.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const RegisterPage = () => {
  const [value, setValue] = useState({
    name: "",
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
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          onChange={onChange}
          value={value.name}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
        ></Input>
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
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <span>Войти</span>
        </p>
      </div>
    </div>
  );
};
