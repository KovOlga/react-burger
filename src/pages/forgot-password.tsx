import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPasswordThunk } from "../services/actions/user";
import { useAppDispatch } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { LOGIN_ROUTE, RESET_PASSWORD_ROUTE } from "../utils/constants";
import { FormEvent, FC } from "react";
import { TForgotPassword } from "../services/types/data";

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm<TForgotPassword>({
    email: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(values.email));
    navigate(RESET_PASSWORD_ROUTE);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
  );
};
