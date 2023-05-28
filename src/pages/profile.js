import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.login.user);

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const onChange = (e) => {
    // setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("render");
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    // if (user.user) {
    //   setValue({ ...value, name: user.user.name, email: user.user.email });
    // }
  }, [user]);

  return (
    <div className={styles.inputs}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
        value={value.name}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <EmailInput
        onChange={onChange}
        value={value.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-2"
      />
      <PasswordInput
        onChange={onChange}
        value={value.password}
        name={"password"}
        extraClass="mb-2"
        placeholder="Пароль"
        icon="EditIcon"
      />
    </div>
  );
};