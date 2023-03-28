import { createPortal } from "react-dom";
import { useState } from "react";
import styles from "./modal-overlay.module.css";
import Modal from "../modal/modal";

const node = document.createElement("div");
document.body.appendChild(node);
node.setAttribute("id", "react-modals");
const modalRoot = document.getElementById("react-modals");

const ModalOverlay = () => {
  return (
    <div className={styles.overlay}>
      <Modal />
    </div>
  );
};

export default ModalOverlay;
