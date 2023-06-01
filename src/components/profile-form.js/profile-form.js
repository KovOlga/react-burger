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

const ProfileForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const updateUserRequest = useSelector(
    (store) => store.user.updateUserRequest
  );
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

  const onSubmitUserData = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(userData)).then(() => {
      setFormChanging(false);
    });
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmitUserData}>
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
              onSubmit={onSubmitUserData}
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
