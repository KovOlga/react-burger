import AppHeader from "../components/app-header/app-header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { FC } from "react";

export const LayoutPage: FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.underlay}></div>
      <div className={styles.container}>
        <AppHeader />
        <Outlet />
      </div>
    </div>
  );
};
