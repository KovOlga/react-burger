import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from "../services/action-types/wsActionTypes";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../services/actions/ingredients";
import { IngredientsListPreview } from "../components/ingredients-list-preview/ingredients-list-preview";

export const FeedPage = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.feed.orders);
  const data = useSelector((store) => store.ingredients.data);
  const dataRequest = useSelector((store) => store.ingredients.dataRequest);
  const dataFailed = useSelector((store) => store.ingredients.dataFailed);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large">Лента заказов</h1>

      <section className={styles.feed}>
        <ul className={`${styles.list} pr-4`}>
          {orders &&
            !dataRequest &&
            !dataFailed &&
            data.length &&
            orders.map((order) => {
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
                  <h2 className="text text_type_main-medium">{order.name}</h2>
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
      <section className={styles.statistics}></section>
    </div>
  );
};
