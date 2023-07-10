import AppHeader from "../components/app-header/app-header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

export const LayoutPage = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <AppHeader />
        <Outlet />
      </div>
    </div>
  );
};
