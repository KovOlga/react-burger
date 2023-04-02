import styles from "./order-details.module.css";
import doneIcon from "../../images/doneIcon.png";
import { memo } from "react";
import PropTypes from "prop-types";

const OrderDetails = memo(({ orderId }) => {
  return (
    <div className={styles.container}>
      <h1 className={`text text_type_digits-large ${styles.identificator}`}>
        {orderId}
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

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired,
};

export default OrderDetails;
