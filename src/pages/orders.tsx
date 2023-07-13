import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  wsUserConnectionStart,
  wsUserConnectionClosed,
} from "../services/actions/wsActions";
import OrderCardList from "../components/order-card-list/order-card-list";
import styles from "./orders.module.css";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { getWsUserOrders } from "../services/selectors/wsUserReducer";

export const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getWsUserOrders);
  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  useEffect(() => {
    dispatch(wsUserConnectionStart());

    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch]);

  return (
    <section className={styles.section}>
      {orders && !dataRequest && !dataFailed && data.length && (
        <OrderCardList data={data} orders={orders} fromComponent="orders" />
      )}
    </section>
  );
};
