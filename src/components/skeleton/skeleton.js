import styles from "./skeleton.module.css";
import burger from "../../images/burger.png";
import { useSelector } from "react-redux";

const Skeleton = () => {
  const isConstructorEmpty = useSelector(
    (store) => store.orderNumber.isConstructorEmpty
  );

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
