import styles from "./skeleton.module.css";
import { FC } from "react";
import burger from "../../images/burger.png";
import { useAppSelector } from "../../hooks/hooks";
import { getConstructorEmpty } from "../../services/selectors/order";

const Skeleton: FC = () => {
  const isConstructorEmpty = useAppSelector(getConstructorEmpty);

  return (
    <div className={styles.container}>
      <img src={burger} alt="burger-icon" />
      <h1 className={`text text_type_main-default ${styles.text}`}>
        {isConstructorEmpty && "Перетащите сюда первый ингредиент"}
      </h1>
    </div>
  );
};

export default Skeleton;
