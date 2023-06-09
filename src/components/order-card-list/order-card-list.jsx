import styles from "./order-card-list.module.css";
import { Link, useLocation } from "react-router-dom";
import { parseOrderIngredients } from "../../utils/utils";
import { OrderCard } from "../order-card/order-card";
import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openOrderInfoModalAction } from "../../services/actions/order-info-modal";

const OrderCardList = ({ orders, data, fromComponent }) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const onOpenOrderInfoModal = useCallback(
    (item) => {
      dispatch(openOrderInfoModalAction(item));
    },
    [dispatch]
  );

  console.log(orders);

  return (
    <ul className={`${styles.list} pr-4`}>
      {orders
        .slice(0)
        .reverse()
        .map((order) => {
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
                fromComponent={fromComponent}
              />
            </Link>
          );
        })}
    </ul>
  );
};

export default OrderCardList;
