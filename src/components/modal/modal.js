import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Modal = ({ onClose, children, container }) => {
  const modalContainer = useRef();

  const close = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        close();
      }
    };

    const handleOverlayClose = (evt) => {
      if (!modalContainer.current.contains(evt.target)) {
        close();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, []);

  return createPortal(
    <ModalOverlay>
      <div ref={modalContainer} className={styles.modal}>
        <div onClick={onClose} className={styles.close_icon}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    container
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  container: PropTypes.object,
};

export default Modal;
