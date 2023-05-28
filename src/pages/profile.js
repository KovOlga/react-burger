import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const user = useSelector((store) => store.user.user);
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormChanging, setFormChanging] = useState(false);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setFormChanging(true);
  };

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (user) {
      setValue({ ...value, name: user.name, email: user.email });
    }
  }, [user]);

  const onSubmitUserData = (value) => {
    console.log(value);
  };

  const onFocus = () => {
    setFormChanging(true);
  };

  return (
    <div className={styles.inputsContainer}>
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
          disabled={!isFormChanging}
          // onFocus={onFocus}
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
      {isFormChanging && (
        <div className={styles.handlers}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
          >
            Отмена
          </p>
          <Button
            onClick={onSubmitUserData}
            htmlType="button"
            type="primary"
            size="medium"
            extraClass={styles.btn}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};
