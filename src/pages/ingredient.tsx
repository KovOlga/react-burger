import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";
import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getIngredients } from "../services/actions/ingredients";
import Loader from "../components/loader/loader";
import styles from "./ingredient.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";

export const IngredientPage: FC = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  const ingredient = data.find((item) => {
    return item._id === id;
  });

  return (
    <div className={styles.container}>
      {dataRequest && <Loader loadingText={"Идет подгрузка ингредиента"} />}
      {dataFailed && "Произошла ошибка"}
      {!dataRequest && !dataFailed && data.length && ingredient && (
        <IngredientDetails ingredient={ingredient} />
      )}
    </div>
  );
};
