import styles from "./order-details.module.css";
import doneIcon from "../../images/doneIcon.png";
import { memo } from "react";
import { useSelector } from "react-redux";

const OrderDetails = memo(() => {
  const orderNumber = useSelector((store) => store.orderNumber.orderNumber);

  return (
    <div className={styles.container}>
      <h1 className={`text text_type_digits-large ${styles.identificator}`}>
        {orderNumber}
      </h1>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img className="mb-15 mt-15" src={doneIcon} alt="Заказ подтвержден" />
      <p className="text text_type_main-default pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
});

export default OrderDetails;
