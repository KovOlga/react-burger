import styles from "./login-form.module.css";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../services/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetPasswordSent = localStorage.getItem("resetPasswordSent");

  const [value, setValue] = useState({
    password: "",
    code: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(value.password, value.code)).then(() => {
      navigate("/login");
    });
  };

  return resetPasswordSent ? (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          placeholder="Введите новый пароль"
        />
        <Input
          type={"text"}
          onChange={onChange}
          value={value.code}
          placeholder={"Введите код из письма"}
          name={"code"}
          size={"default"}
          required
        ></Input>
        <Button
          onSubmit={onSubmit}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
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
  ) : (
    <Navigate to="/forgot-password" replace />
  );
};
