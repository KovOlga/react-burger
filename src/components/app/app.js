import React from "react";
import { useEffect, useCallback } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getOrderNumber } from "../../services/actions";
import {
  SET_CURRENT_INGREDIENT,
  TOGGLE_INGREDIENT_INFO_MODAL,
  CLEAR_CURRENT_INGREDIENT,
  TOGGLE_ORDER_INFO_MODAL,
} from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const modalRoot = document.getElementById("react-modals");

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );
  const orderNumberSuccess = useSelector(
    (store) => store.orderNumber.orderNumberSuccess
  );
  const isIngredientInfoModalShown = useSelector(
    (store) => store.ingredients.isIngredientInfoModalShown
  );
  const isOrderDetailsInfoModalShown = useSelector(
    (store) => store.ingredients.isOrderDetailsInfoModalShown
  );

  const openIngredientInfo = useCallback((item) => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
  }, []);

  const closeIngredientInfoModal = useCallback(() => {
    dispatch({ type: TOGGLE_INGREDIENT_INFO_MODAL });
    dispatch({ type: CLEAR_CURRENT_INGREDIENT });
  }, []);

  const closeOrderInfoModal = useCallback(() => {
    dispatch({ type: TOGGLE_ORDER_INFO_MODAL });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {dataRequest && (
          <Loader loadingText={"Идет загрузка космической станции"} />
        )}
        {dataFailed && "Произошла ошибка"}
        {!dataRequest && !dataFailed && data.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onOpenIngredientInfo={openIngredientInfo} />

            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
      {isIngredientInfoModalShown && (
        <Modal onClose={closeIngredientInfoModal} container={modalRoot}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {isOrderDetailsInfoModalShown && orderNumberSuccess && (
        <Modal onClose={closeOrderInfoModal} container={modalRoot}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
