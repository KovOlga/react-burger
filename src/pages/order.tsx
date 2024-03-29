import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loader from "../components/loader/loader";
import styles from "./ingredient.module.css";
import {
  WS_CONNECTION_START,
  WS_USER_CONNECTION_START,
} from "../services/action-types/wsActionTypes";
import { parseOrderIngredients } from "../utils/utils";
import OrderModal from "../components/order-modal/order-modal";
import {
  getData,
  getDataRequest,
  getDataFailed,
} from "../services/selectors/ingredients";
import { TwsOrderResponse } from "../services/types/data";

export const OrderPage: FC<{ from: string }> = ({ from }) => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const [currentOrder, setCurrentOrder] = useState<TwsOrderResponse | null>(
    null
  );

  const orders = useAppSelector((store) =>
    from === "feed" ? store.wsfeed.orders : store.wsUser.orders
  );

  const data = useAppSelector(getData);
  const dataRequest = useAppSelector(getDataRequest);
  const dataFailed = useAppSelector(getDataFailed);

  useEffect(() => {
    if (from === "feed") {
      dispatch({ type: WS_CONNECTION_START });
    } else {
      dispatch({ type: WS_USER_CONNECTION_START });
    }
  }, [dispatch, from]);

  useEffect(() => {
    if (orders) {
      const order = orders.find((order) => {
        return order.number === Number(id);
      });
      if (order) {
        setCurrentOrder(order);
      }
    }
  }, [orders, id, currentOrder]);

  return (
    <div className={styles.container}>
      {dataRequest && <Loader loadingText={"Идет подгрузка ингредиента"} />}
      {dataFailed && "Произошла ошибка"}
      {!dataRequest && !dataFailed && data.length && currentOrder && orders && (
        <OrderModal order={parseOrderIngredients(data, currentOrder)} />
      )}
    </div>
  );
};
