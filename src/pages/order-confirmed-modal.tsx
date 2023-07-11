import Modal from "../components/modal/modal";
import { useCallback, FC } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetails from "../components/order-details/order-details";
import { useAppDispatch } from "../hooks/hooks";
import { closeOrderModalAction } from "../services/actions/order";

export const OrderConfirmedModalPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOrderDetailsInfoModalShown = localStorage.getItem(
    "isOrderDetailsInfoModalShown"
  );
  const newOrder = localStorage.getItem("newOrderConfirmedDetails");

  const closeOrderInfoModal = useCallback(() => {
    dispatch(closeOrderModalAction());
    navigate(-1);
  }, [dispatch, navigate]);

  return (
    <>
      {isOrderDetailsInfoModalShown && newOrder && (
        <Modal onClose={closeOrderInfoModal}>
          <OrderDetails newOrderNumber={JSON.parse(newOrder).number} />
        </Modal>
      )}
    </>
  );
};
