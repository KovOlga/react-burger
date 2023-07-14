import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, FormEvent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { loginUserThunk } from "../services/actions/user";
import { useForm } from "../hooks/useForm";
import {
  REGISTER_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
} from "../utils/constants";
import { FC } from "react";
import { TUserForm } from "../services/types/data";
import { useNavigate, useLocation } from "react-router-dom";

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm<TUserForm>({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        loginUserThunk(values, () => {
          if (location.state !== null && location.state.from) {
            navigate(location.state.from.pathname);
            return;
          } else {
            navigate(HOME_ROUTE);
          }
        })
      );
    },
    [values, dispatch, navigate, location.state]
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
