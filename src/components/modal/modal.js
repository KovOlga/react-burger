import styles from "./modal.module.css";
import OrderDetails from "../order-details/order-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.close_icon}>
        <CloseIcon type="primary" />
      </div>
      <OrderDetails />
    </div>
  );
};

export default Modal;
