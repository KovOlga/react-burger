import styles from "./profile-form.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserInfo, getUserInfo } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { getUpdateUserRequest, getUser } from "../../services/selectors/user";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const updateUserRequest = useSelector(getUpdateUserRequest);
  const user = useSelector(getUser);

  const [isFormChanging, setFormChanging] = useState(false);
  const [isNameFocus, setNameFocus] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(values)).then(() => {
      setFormChanging(false);
    });
  };

  const resetForm = () => {
    setFormChanging(false);
    setValues(user);
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
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user, setValues]);

  return (
    <div className={styles.container}>
      <form name="profile" className={styles.form} onSubmit={onSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={values.name}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onNameEditIconClick}
          onBlur={onNameBlur}
          errorText={"Ошибка"}
          size={"default"}
          disabled={isNameFocus}
          extraClass="profile__input"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          onFocus={onFocus}
          extraClass="profile__input"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder="Пароль"
          icon="EditIcon"
          onFocus={onFocus}
          extraClass="profile__input"
        />
        {isFormChanging && (
          <div className={styles.handlers}>
            <Button
              htmlType="reset"
              type="secondary"
              size="large"
              onClick={resetForm}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.btn}
            >
              {updateUserRequest ? "Сохраняется" : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
