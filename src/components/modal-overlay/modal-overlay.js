import { useState } from "react";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <Modal onClose={onClose} />
    </div>
  );
};

export default ModalOverlay;
