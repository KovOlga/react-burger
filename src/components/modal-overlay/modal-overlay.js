import { useEffect, createRef } from "react";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";

const ModalOverlay = ({ onClose }) => {
  const modalContainer = createRef();

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, []);

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

  return (
    <div className={styles.overlay}>
      <Modal ref={modalContainer} onClose={onClose} />
    </div>
  );
};

export default ModalOverlay;
