import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { forwardRef } from "react";

const Modal = forwardRef(({ onClose, children }, ref) => {
  return (
    <div ref={ref} className={styles.modal}>
      <div onClick={onClose} className={styles.close_icon}>
        <CloseIcon type="primary" />
      </div>
      {children}
    </div>
  );
});

export default Modal;
