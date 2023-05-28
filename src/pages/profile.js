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
import { updateUserInfo } from "../services/actions";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const user = useSelector((store) => store.user.user);
  const [userData, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormChanging, setFormChanging] = useState(false);
  const [isNameFocus, setNameFocus] = useState(true);

  const onChange = (e) => {
    setValue({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitUserData = () => {
    dispatch(updateUserInfo(userData));
  };

  const resetForm = () => {
    setFormChanging(false);
    setValue(user);
  };

  const onNameEditIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setFormChanging(true);
    setNameFocus(false);
  };

  const onNameBlur = () => {
    setNameFocus(true);
  };

  const onFocus = () => {
    setFormChanging(true);
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (user) {
      setValue({ ...userData, name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <div className={styles.inputsContainer}>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          value={userData.name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onNameEditIconClick}
          onBlur={onNameBlur}
          errorText={"Ошибка"}
          size={"default"}
          disabled={isNameFocus}
        />
        <EmailInput
          onChange={onChange}
          value={userData.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          onFocus={onFocus}
        />
        <PasswordInput
          onChange={onChange}
          value={userData.password}
          name={"password"}
          placeholder="Пароль"
          icon="EditIcon"
          onFocus={onFocus}
        />
      </div>
      {isFormChanging && (
        <div className={styles.handlers}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.text}`}
            onClick={resetForm}
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
