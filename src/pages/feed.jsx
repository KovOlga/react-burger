import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./feed.module.css";
import { getIngredients } from "../services/actions/ingredients";
import { Link } from "react-router-dom";
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed,
} from "../services/actions/wsActions";
import OrderCardList from "../components/order-card-list/order-card-list";

export const FeedPage = () => {
  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector(
    (store) => store.wsfeed.orders
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

  useEffect(() => {
    dispatch(getIngredients());
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
                          to={`/feed/${number}`}
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
                          to={`/feed/${number}`}
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
    </main>
  );
};
