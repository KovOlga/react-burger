import React from "react";
import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {
  const baseUrl = "https://norma.nomoreparties.space/api/ingredients";
  const getResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(baseUrl)
      .then(getResponse)
      .then(({ data }) => setState({ ...state, data, isLoading: false }))
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </>
        )}
      </main>
    </>
  );
};

export default App;
