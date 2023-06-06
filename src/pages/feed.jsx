import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from "../services/action-types/wsActionTypes";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../services/actions/ingredients";
import { IngredientsListPreview } from "../components/ingredients-list-preview/ingredients-list-preview";

export const FeedPage = () => {
  const dispatch = useDispatch();

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

  return (
    <div className={styles.container}>
      {orders && !dataRequest && !dataFailed && data.length && (
        <>
          <section className={styles.feed}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <ul className={`${styles.list} pr-4`}>
              {orders.map((order) => {
                return (
                  <li key={order._id} className={styles.card}>
                    <div className={styles.card__id}>
                      <h3 className="text text_type_digits-default">
                        {`#${order.number}`}
                      </h3>
                      <p className="text text_type_main-default text_color_inactive">
                        {order.updatedAt}
                      </p>
                    </div>
                    <h2 className={`${styles.name} text text_type_main-medium`}>
                      {order.name}
                    </h2>
                    <div className={styles.card__bottom}>
                      <IngredientsListPreview
                        data={data}
                        orderIngredientsIdArray={order.ingredients}
                      />
                      <div className={styles.card_price}>
                        <p className="text text_type_digits-default">480</p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
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
