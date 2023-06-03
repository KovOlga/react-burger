import AppHeader from "../components/app-header/app-header";
import { Outlet } from "react-router-dom";

export const LayoutPage = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
