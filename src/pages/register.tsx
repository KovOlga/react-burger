import styles from "./login-form.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerUserThunk } from "../services/actions/user";
import { useAppDispatch } from "../hooks/hooks";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/constants";
import { FormEvent } from "react";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk(values));
    // .then((res) => {
    //   if (res.success) {
    //     navigate(LOGIN_ROUTE);
    //   }
    // });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          onChange={handleChange}
          value={values.name}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
        ></Input>
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
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.activities}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link className={styles.link} to={LOGIN_ROUTE}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
