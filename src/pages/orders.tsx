import { useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../hooks/hooks";
import {
  wsUserConnectionStart,
  wsUserConnectionClosed,
} from "../services/actions/wsActions";
import { getIngredients } from "../services/actions/ingredients";
import OrderCardList from "../components/order-card-list/order-card-list";
import styles from "./orders.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { getWsUserOrders } from "../services/selectors/wsUserReducer";

export const OrdersPage = () => {
  const dispatch = useCustomDispatch();

  const orders = useCustomSelector(getWsUserOrders);
  const data = useCustomSelector(getData);
  const dataRequest = useCustomSelector(getDataRequest);
  const dataFailed = useCustomSelector(getDataFailed);

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
