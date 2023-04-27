import React from "react";
import { useEffect, useState, useCallback } from "react";
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
import { SET_CURRENT_INGREDIENT } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const modalRoot = document.getElementById("react-modals");

const App = () => {
  const dispatch = useDispatch();

  const [popupIsOpen, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);
  const currentBun = useSelector((store) => store.ingredients.currentBun);
  const constructorIngredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );
  const currentIngredient = useSelector(
    (store) => store.ingredients.currentIngredient
  );
  const orderNumberSuccess = useSelector(
    (store) => store.orderNumber.orderNumberSuccess
  );

  const togglePopup = () => {
    setPopup(!popupIsOpen);
  };

  const openIngredientInfo = useCallback((item) => {
    setIsActive(true);
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: item });
    togglePopup();
  }, []);

  const openConfirm = useCallback(() => {
    const orderArr = [
      constructorIngredients.map((ingredient) => {
        return ingredient._id;
      }),
      Object.keys(currentBun).length === 0 ? [] : currentBun._id,
    ].flatMap((i) => i);
    dispatch(getOrderNumber(orderArr));
    setIsActive(false);
    togglePopup();
  }, [constructorIngredients, currentBun._id, dispatch]);

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

            <BurgerConstructor onOpenConfirm={openConfirm} />
          </DndProvider>
        )}
      </main>
      {popupIsOpen && (orderNumberSuccess || isActive) && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (
            <IngredientDetails ingredient={currentIngredient} />
          ) : (
            orderNumberSuccess && <OrderDetails />
          )}
        </Modal>
      )}
    </>
  );
};

export default App;
