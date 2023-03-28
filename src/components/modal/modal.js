import styles from "./modal.module.css";
import OrderDetails from "../order-details/order-details";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";

const Modal = forwardRef(({ onClose }, ref) => {
  return (
    <div ref={ref} className={styles.modal}>
      <div onClick={onClose} className={styles.close_icon}>
        <CloseIcon type="primary" />
      </div>
      <OrderDetails />
    </div>
  );
});

export default Modal;
