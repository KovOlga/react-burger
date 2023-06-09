import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
} from "../utils/constants";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUser(values)).then(() => {
        if (location.state !== null && location.state.from) {
          navigate(location.state.from.pathname);
        } else {
          navigate(HOME_ROUTE);
        }
      });
    },
    [values, dispatch, location.state, navigate]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder="E-mail"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder="Пароль"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{" "}
          <Link className={styles.link} to={REGISTER_ROUTE}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link className={styles.link} to={FORGOT_PASSWORD_ROUTE}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
