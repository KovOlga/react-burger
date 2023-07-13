import Loader from "../components/loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useCallback, FC } from "react";
import styles from "./home.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { TIngredientConstructor } from "../services/types/data";
import { getNewOrderInfo } from "../services/selectors/order";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { closeOrderModalAction } from "../services/actions/order";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);
  const newOrderInfo = useAppSelector(getNewOrderInfo);

  const openIngredientInfo = useCallback((item: TIngredientConstructor) => {
    localStorage.setItem("isIngredientInfoModalShown", "true");
    localStorage.setItem("currentIngredientShown", JSON.stringify(item));
  }, []);

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

      {newOrderInfo && (
        <Modal onClose={closeOrderInfoModal}>
          <OrderDetails newOrderNumber={newOrderInfo.number} />
        </Modal>
      )}
    </>
  );
};
