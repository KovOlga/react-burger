import styles from "./order-card-list.module.css";
import { Link, useLocation } from "react-router-dom";
import { parseOrderIngredients } from "../../utils/utils";
import OrderCard from "../order-card/order-card";
import { useCallback, FC } from "react";
import { useDispatch } from "react-redux";
import { openOrderInfoModalThunk } from "../../services/actions/order-info-modal";
import { openOrderInfoModalAction } from "../../services/actions/order-info-modal";
import { PROFILE_ROUTE } from "../../utils/constants";
import {
  TOrderCounted,
  TOrder,
  TIngredientCustom,
} from "../../services/types/data";

interface OrderCardListProps {
  orders: TOrder[];
  data: TIngredientCustom[];
  fromComponent: string;
}

const OrderCardList: FC<OrderCardListProps> = ({
  orders,
  data,
  fromComponent,
}) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const onOpenOrderInfoModal = useCallback(
    (item: TOrderCounted) => {
      dispatch(openOrderInfoModalAction(item));
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
