import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { FC, ReactNode } from "react";
import { modalRoot } from "../../utils/constants";

interface ModalProps {
  onClose: () => void; ///check
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const modalContainer = useRef<HTMLDivElement>(null);

  const close = () => {
    onClose();
  };

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        close();
      }
    };

    ///check
    const handleOverlayClose = (evt: MouseEvent) => {
      if (evt.target instanceof Node) {
        if (!modalContainer.current!.contains(evt.target)) {
          close();
        }
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, []);

  console.log("modal");

  return createPortal(
    <ModalOverlay>
      <div ref={modalContainer} className={styles.modal}>
        <div onClick={onClose} className={styles.close_icon}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
