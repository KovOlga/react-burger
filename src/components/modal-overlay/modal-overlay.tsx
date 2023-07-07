import styles from "./modal-overlay.module.css";
import { FC, ReactNode } from "react";

const ModalOverlay: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default ModalOverlay;
