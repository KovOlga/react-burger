import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
import Loader from "../components/loader/loader";
import styles from "./ingredient.module.css";
import { WS_CONNECTION_START } from "../services/action-types/wsActionTypes";
import { parseOrderIngredients } from "../utils/utils";
import OrderModal from "../components/order-modal/order-modal";

export const OrderPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);

  const { orders } = useSelector((store) => store.feed.orders);

  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  let currentOrder = {};
  if (orders && data) {
    currentOrder = orders.find((order) => {
      return order.number === Number(id);
    });
  }

  return (
    <div className={styles.container}>
      {dataRequest && <Loader loadingText={"Идет подгрузка ингредиента"} />}
      {dataFailed && "Произошла ошибка"}
      {!dataRequest && !dataFailed && data.length && currentOrder && orders && (
        <OrderModal order={parseOrderIngredients(data, currentOrder)} />
      )}
    </div>
  );
};
