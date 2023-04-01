import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const Modal = ({ onClose, children }) => {
  const modalContainer = useRef();

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    const handleOverlayClose = (evt) => {
      if (!modalContainer.current.contains(evt.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, []);

  return (
    <ModalOverlay>
      <div ref={modalContainer} className={styles.modal}>
        <div onClick={onClose} className={styles.close_icon}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
