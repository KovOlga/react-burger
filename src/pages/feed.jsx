import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/action-types/wsActionTypes";
import styles from "./feed.module.css";
import { getIngredients } from "../services/actions/ingredients";
import { Link, useLocation } from "react-router-dom";
import { openOrderInfoModalAction } from "../services/actions/order-info-modal";
import { OrderCard } from "../components/order-card/order-card";
import { parseOrderIngredients } from "../utils/utils";

export const FeedPage = () => {
  const dispatch = useDispatch();
  let location = useLocation();

  const { orders, total, totalToday } = useSelector(
    (store) => store.feed.orders
  );
  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

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
          .filter((order) => order.status === "!done")
          .map((order) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const onOpenOrderInfoModal = useCallback(
    (item) => {
      dispatch(openOrderInfoModalAction(item));
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      {orders && !dataRequest && !dataFailed && data.length && (
        <>
          <section className={styles.feed}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <ul className={`${styles.list} pr-4`}>
              {orders.map((order) => {
                return (
                  <Link
                    key={order._id}
                    className={styles.link}
                    to={`/feed/${order.number}`}
                    state={{ background: location }}
                  >
                    <OrderCard
                      order={parseOrderIngredients(data, order)}
                      onClick={onOpenOrderInfoModal}
                    />
                  </Link>
                );
              })}
            </ul>
          </section>
          <section className={styles.statistics}>
            <div className={styles.orders}>
              <div className={styles.orders__type}>
                <h2 className="text text_type_main-medium">Готовы:</h2>
                <ul className={styles.orders__list}>
                  {done &&
                    done.map((number, index) => {
                      return (
                        <li
                          key={index}
                          className={`${styles.orders__item} text text_type_digits-default`}
                        >
                          {number}
                        </li>
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
                        <li
                          key={index}
                          className={`${styles.orders__item} text text_type_digits-default`}
                        >
                          {number}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className={styles.total}>
              <h2 className="text text_type_main-medium">
                Выполнено за все время:
              </h2>
              <p className={`${styles.digits} text text_type_digits-large`}>
                {total}
              </p>
            </div>
            <div className={styles.totalToday}>
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
    </div>
  );
};
