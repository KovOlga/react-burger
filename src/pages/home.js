import AppHeader from "../components/app-header/app-header";
import Loader from "../components/loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getIngredients } from "../services/actions";
import {
  openIngredientModalAction,
  closeIngredientModalAction,
  closeOrderModalAction,
} from "../services/actions";
import styles from "./home.module.css";

const modalRoot = document.getElementById("react-modals");

export const HomePage = () => {
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
    dispatch(openIngredientModalAction(item));
  }, []);

  const closeIngredientInfoModal = useCallback(() => {
    dispatch(closeIngredientModalAction());
  }, []);

  const closeOrderInfoModal = useCallback(() => {
    dispatch(closeOrderModalAction());
  }, []);

  return (
    <>
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
