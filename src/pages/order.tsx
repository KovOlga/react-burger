import { useParams } from "react-router-dom";
import { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../services/actions/ingredients";
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

export const OrderPage: FC<{ from: string }> = ({ from }) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [currentOrder, setCurrentOrder] = useState(null);

  const orders = useSelector((store) =>
    from === "feed" ? store.wsfeed.orders.orders : store.wsUser.orders
  );

  const data = useSelector(getData);
  const dataRequest = useSelector(getDataRequest);
  const dataFailed = useSelector(getDataFailed);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (from === "feed") {
      dispatch({ type: WS_CONNECTION_START });
    } else {
      dispatch({ type: WS_USER_CONNECTION_START });
    }
  }, [dispatch, from]);

  useEffect(() => {
    if (orders) {
      setCurrentOrder(
        orders.find((order) => {
          return order.number === Number(id);
        })
      );
    }
  }, [orders, id]);

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
