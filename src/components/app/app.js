import React from "react";
import { useEffect, useState, useCallback } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Api from "../../services/api/api";
import { IngredientsContext } from "../../services/contexts/ingredientsContext";
import { TotalPriceContext } from "../../services/contexts/totalPriceContext";
import { ConstructorContext } from "../../services/contexts/ingredientsContext";
import { defaultIngredient } from "../../utils/defaultData";
import { defaultBun } from "../../utils/defaultData";

const modalRoot = document.getElementById("react-modals");
const api = new Api();

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [constructorIngredients, setConstructorIngredients] = useState([
    defaultIngredient,
  ]);
  const [bun, setBun] = useState(defaultBun);

  const [popupIsOpen, setPopup] = useState(false);
  const [currentIngredient, setIngredient] = useState(null);
  const [isActive, setIsActive] = useState(false);

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

  const togglePopup = () => {
    setPopup(!popupIsOpen);
  };

  const openIngredientInfo = useCallback((item) => {
    setIngredient(item);
    setIsActive(true);
    togglePopup();
  }, []);

  const openConfirm = useCallback(() => {
    setIsActive(false);
    togglePopup();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <IngredientsContext.Provider value={state.data}>
            <ConstructorContext.Provider
              value={{
                bun,
                setBun,
                constructorIngredients,
                setConstructorIngredients,
              }}
            >
              <BurgerIngredients onOpenIngredientInfo={openIngredientInfo} />
              <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
                <BurgerConstructor
                  onOpenIngredientInfo={openIngredientInfo}
                  onOpenConfirm={openConfirm}
                />
              </TotalPriceContext.Provider>
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        )}
      </main>
      {popupIsOpen && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (
            <IngredientDetails ingredient={currentIngredient} />
          ) : (
            <OrderDetails orderId="034536" />
          )}
        </Modal>
      )}
    </>
  );
};

export default App;
