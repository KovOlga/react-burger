import React from "react";
import { useEffect, useState, useCallback } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { createPortal } from "react-dom";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Api from "../api/api";

const modalRoot = document.getElementById("react-modals");
const api = new Api();

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });

  useEffect(() => {
    (() => {
      setState({ ...state, hasError: false, isLoading: true });
      api
        .getIngredientsList()
        .then(({ data }) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    })();
  }, []);

  const [popupIsOpen, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popupIsOpen);
  };

  const [currentIngredient, setIngredient] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [modalChild, setModalChild] = useState("");

  const openIngredientInfo = useCallback((item) => {
    setIngredient(item);
    setModalChild("ingredient");
    togglePopup();
  }, []);

  const openConfirm = useCallback(() => {
    setConfirm(true);
    setModalChild("order");
    togglePopup();
  }, []);

  console.log("компонент App заново родилсya!");

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
              onOpenIngredientInfo={openIngredientInfo}
            />
            <BurgerConstructor
              data={state.data}
              onOpenIngredientInfo={openIngredientInfo}
              onOpenConfirm={openConfirm}
            />
          </>
        )}
      </main>
      {popupIsOpen &&
        createPortal(
          <Modal onClose={togglePopup}>
            {modalChild === "ingredient" && (
              <IngredientDetails ingredient={currentIngredient} />
            )}
            {modalChild === "order" && confirm && (
              <OrderDetails orderId="034536" />
            )}
          </Modal>,
          modalRoot
        )}
    </>
  );
};

export default App;
