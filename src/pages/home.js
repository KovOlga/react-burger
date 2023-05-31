import Loader from "../components/loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getIngredients } from "../services/actions";
import {
  openIngredientModalAction,
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

  const orderNumberSuccess = useSelector(
    (store) => store.orderNumber.orderNumberSuccess
  );
  const isOrderDetailsInfoModalShown = useSelector(
    (store) => store.ingredients.isOrderDetailsInfoModalShown
  );

  const openIngredientInfo = useCallback((item) => {
    dispatch(openIngredientModalAction(item));
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

      {isOrderDetailsInfoModalShown && orderNumberSuccess && (
        <Modal onClose={closeOrderInfoModal} container={modalRoot}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
