import Loader from "../components/loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useCallback } from "react";
import { getIngredients } from "../services/actions/ingredients";
import { openIngredientModalThunk } from "../services/actions/ingredient-modal";
import { closeOrderModalAction } from "../services/actions/order";
import styles from "./home.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { TIngredientConstructor } from "../services/types/data";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  const openIngredientInfo = useCallback(
    (item: TIngredientConstructor) => {
      dispatch(openIngredientModalThunk(item));
    },
    [dispatch]
  );

  const closeOrderInfoModal = useCallback(() => {
    dispatch(closeOrderModalAction());
  }, [dispatch]);

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

      {JSON.parse(
        localStorage.getItem("isOrderDetailsInfoModalShown") || ""
      ) && (
        <Modal onClose={closeOrderInfoModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
