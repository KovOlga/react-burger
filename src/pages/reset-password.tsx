import styles from "./login-form.module.css";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordThunk } from "../services/actions/user";
import { useAppDispatch } from "../hooks/hooks";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE } from "../utils/constants";
import { FormEvent } from "react";
import { TResetPassword } from "../services/types/data";

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm<TResetPassword>({
    password: "",
    code: "",
  });
  const resetPasswordSent = localStorage.getItem("resetPasswordSent");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPasswordThunk(values));
    navigate(LOGIN_ROUTE);
  };

  return resetPasswordSent ? (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder="Введите новый пароль"
        />
        <Input
          type={"text"}
          onChange={handleChange}
          value={values.code}
          placeholder={"Введите код из письма"}
          name={"code"}
          size={"default"}
          required
        ></Input>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={LOGIN_ROUTE} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <Navigate to={FORGOT_PASSWORD_ROUTE} replace />
  );
};
