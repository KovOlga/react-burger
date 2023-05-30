import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../services/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(value.email)).then(() => {
      navigate("/reset-password");
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          placeholder="Укажите e-mail"
        />
        <Button
          onClick={onSubmit}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
