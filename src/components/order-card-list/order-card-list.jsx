import styles from "./order-card-list.module.css";
import { Link, useLocation } from "react-router-dom";
import { parseOrderIngredients } from "../../utils/utils";
import OrderCard from "../order-card/order-card";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openOrderInfoModalAction } from "../../services/actions/order-info-modal";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

const OrderCardList = ({ orders, data, fromComponent }) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const onOpenOrderInfoModal = useCallback(
    (item) => {
      dispatch(openOrderInfoModalAction(item));
    },
    [dispatch]
  );

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
              to={
                fromComponent === "feed"
                  ? `/${fromComponent}/${order.number}`
                  : `/profile/${fromComponent}/${order.number}`
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

OrderCardList.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  fromComponent: PropTypes.string.isRequired,
};

export default OrderCardList;
