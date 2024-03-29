import { useEffect, useMemo, FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import styles from "./feed.module.css";
import { Link } from "react-router-dom";
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed,
} from "../services/actions/wsActions";
import OrderCardList from "../components/order-card-list/order-card-list";
import { FEED_ROUTE } from "../utils/constants";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import {
  getWsFeedOrders,
  getWsFeedOrdersTotal,
  getWsFeedOrdersTotalToday,
} from "../services/selectors/wsFeedReducer";

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(getWsFeedOrders);
  const total = useAppSelector(getWsFeedOrdersTotal);
  const totalToday = useAppSelector(getWsFeedOrdersTotalToday);

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  const done = useMemo(() => {
    return orders
      ? orders
          .filter((order) => order.status === "done")
          .map((order) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  const inProcess = useMemo(() => {
    return orders
      ? orders
          .filter((order) => order.status === "pending")
          .map((order) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  return (
    <main className={styles.container}>
      {orders && !dataRequest && !dataFailed && data.length && (
        <>
          <section className={styles.feed}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <OrderCardList data={data} orders={orders} fromComponent="feed" />
          </section>
          <section className={styles.statistics}>
            <div className={styles.orders}>
              <div className={styles.orders__type}>
                <h2 className="text text_type_main-medium">Готовы:</h2>
                <ul className={styles.orders__list}>
                  {done &&
                    done.map((number, index) => {
                      return (
                        <Link
                          to={`${FEED_ROUTE}/${number}`}
                          key={index}
                          className={styles.link}
                        >
                          <li
                            className={`${styles.orders__item} text text_type_digits-default`}
                          >
                            {number}
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </div>
              <div className={styles.orders__type}>
                <h2 className="text text_type_main-medium">В работе:</h2>
                <ul className={styles.orders__list}>
                  {inProcess &&
                    inProcess.map((number, index) => {
                      return (
                        <Link
                          to={`${FEED_ROUTE}/${number}`}
                          key={index}
                          className={styles.link}
                        >
                          <li className="text text_type_digits-default">
                            {number}
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium">
                Выполнено за все время:
              </h2>
              <p className={`${styles.digits} text text_type_digits-large`}>
                {total}
              </p>
            </div>
            <div>
              <h2 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h2>
              <p className={`${styles.digits} text text_type_digits-large`}>
                {totalToday}
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
};
