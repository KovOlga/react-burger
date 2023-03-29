import React from "react";
import { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
const modalRoot = document.getElementById("react-modals");

const App = () => {
  const [popupIsOpen, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popupIsOpen);
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

  const [currentUngredient, setIngredient] = useState(null);

  const changeIngredient = (item) => {
    setIngredient(item);
    togglePopup();
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <>
            <BurgerIngredients
              data={state.data}
              onOpenIngredientInfo={changeIngredient}
            />
            <BurgerConstructor
              data={state.data}
              onOpenIngredientInfo={changeIngredient}
              onOpenConfirm={togglePopup}
            />
          </>
        )}
      </main>
      {popupIsOpen &&
        createPortal(
          <Modal onClose={togglePopup}>
            <IngredientDetails ingredient={currentUngredient} />
            {/* <OrderDetails /> */}
          </Modal>,
          modalRoot
        )}
    </>
  );
};

export default App;
