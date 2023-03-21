import React from "react";
// import styles from "./app.module.css";
import data from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

const App = () => {
  return (
    <>
      <AppHeader />
      <BurgerIngredients data={data} />
    </>
  );
};

export default App;
