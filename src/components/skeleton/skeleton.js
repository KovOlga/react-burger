import styles from "./skeleton.module.css";
import burger from "../../images/burger.png";
import { useSelector } from "react-redux";

const Skeleton = () => {
  const isDragging = useSelector((store) => store.ingredients.isDragging);

  const orderNumberIsEmpty = useSelector(
    (store) => store.orderNumber.orderNumberIsEmpty
  );

  const containerClassName = isDragging
    ? `${styles.container} ${styles.drop_available}`
    : styles.container;

  return (
    <div className={containerClassName}>
      <img src={burger} alt="burger-icon" />
      <h1 className={`text text_type_main-default ${styles.text}`}>
        {orderNumberIsEmpty
          ? "Галактический бургер не собран, не можем начать готовить"
          : "Перетащите сюда первый ингредиент"}
      </h1>
    </div>
  );
};

export default Skeleton;
