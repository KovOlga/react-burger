import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginUser } from "../services/actions";
import { useAuth } from "../services/actions";
import { useDispatch } from "react-redux";

export const LoginPage = () => {
  let auth = useAuth();
  const dispatch = useDispatch();
  const [loginForm, setValue] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...loginForm, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      auth.loginUser(loginForm);
    },
    [auth, loginForm]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={onChange}
          value={loginForm.email}
          name={"email"}
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={onChange}
          value={loginForm.password}
          name={"password"}
          placeholder="Пароль"
        />
        <Button
          onClick={onSubmit}
          htmlType="button"
          type="primary"
          size="medium"
        >
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
