import Loader from "../components/loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useCallback, FC } from "react";
import { getIngredients } from "../services/actions/ingredients";
import styles from "./home.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { TIngredientConstructor } from "../services/types/data";
import {
  getNewOrderSuccess,
  getNewOrderNumber,
} from "../services/selectors/order";
import { useLocation, Navigate } from "react-router-dom";

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  const newOrderSuccess = useAppSelector(getNewOrderSuccess);
  const number = useAppSelector(getNewOrderNumber);

  const openIngredientInfo = useCallback((item: TIngredientConstructor) => {
    localStorage.setItem("isIngredientInfoModalShown", "true");
    localStorage.setItem("currentIngredientShown", JSON.stringify(item));
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

      {newOrderSuccess && number && (
        <Navigate to={`/:${number}`} state={{ background: location }} />
      )}
    </>
  );
};
