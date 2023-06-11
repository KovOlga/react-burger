import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsUserConnectionStart,
  wsUserConnectionClosed,
} from "../services/actions/wsActions";
import { getIngredients } from "../services/actions/ingredients";
import OrderCardList from "../components/order-card-list/order-card-list";
import styles from "./orders.module.css";

export const OrdersPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((store) => store.wsUser.orders);
  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      {orders && !dataRequest && !dataFailed && data.length && (
        <OrderCardList data={data} orders={orders} fromComponent="orders" />
      )}
    </section>
  );
};
