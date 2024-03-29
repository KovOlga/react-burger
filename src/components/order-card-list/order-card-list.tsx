import styles from "./order-card-list.module.css";
import { Link, useLocation } from "react-router-dom";
import { parseOrderIngredients } from "../../utils/utils";
import OrderCard from "../order-card/order-card";
import { useCallback, FC } from "react";
import { PROFILE_ROUTE } from "../../utils/constants";
import {
  TIngredientCounted,
  TUpdatedOrder,
  TwsOrderResponse,
} from "../../services/types/data";

interface OrderCardListProps {
  orders: TwsOrderResponse[];
  data: TIngredientCounted[];
  fromComponent: string;
}

const OrderCardList: FC<OrderCardListProps> = ({
  orders,
  data,
  fromComponent,
}) => {
  let location = useLocation();

  const onOpenOrderInfoModal = useCallback((item: TUpdatedOrder) => {
    localStorage.setItem("isOrderInfoModalShown", "true");
    localStorage.setItem("currentOrderInfoShown", JSON.stringify(item));
  }, []);

  return (
    <ul className={`${styles.list} pr-4`}>
      {orders.slice(0).map((order) => {
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
