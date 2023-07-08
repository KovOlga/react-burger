import styles from "./order-card-list.module.css";
import { Link, useLocation } from "react-router-dom";
import { parseOrderIngredients } from "../../utils/utils";
import OrderCard from "../order-card/order-card";
import { useCallback, FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { openOrderInfoModalThunk } from "../../services/actions/order-info-modal";
import { PROFILE_ROUTE } from "../../utils/constants";
import {
  TOrderCounted,
  TOrder,
  TIngredientConstructor,
} from "../../services/types/data";

interface OrderCardListProps {
  orders: TOrder[];
  data: TIngredientConstructor[];
  fromComponent: string;
}

const OrderCardList: FC<OrderCardListProps> = ({
  orders,
  data,
  fromComponent,
}) => {
  let location = useLocation();
  const dispatch = useAppDispatch();

  const onOpenOrderInfoModal = useCallback(
    (item: TOrderCounted) => {
      dispatch(openOrderInfoModalThunk(item));
    },
    [dispatch]
  );

  return (
    <ul className={`${styles.list} pr-4`}>
      {orders
        .slice(0)
        .reverse()
        .map((order: TOrder) => {
          return (
            <Link
              key={order._id}
              className={styles.link}
              to={
                fromComponent === "feed"
                  ? `/${fromComponent}/${order.number}`
                  : `${PROFILE_ROUTE}/${fromComponent}/${order.number}`
              }
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
