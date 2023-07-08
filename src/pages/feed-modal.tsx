import { useCallback } from "react";
import OrderModal from "../components/order-modal/order-modal";
import Modal from "../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { closeOrderInfoModalThunk } from "../services/actions/order-info-modal";
import { useAppDispatch } from "../hooks/hooks";

export const FeedModalPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOrder = JSON.parse(
    localStorage.getItem("currentOrderInfoShown") || ""
  );
  const isOrderInfoModalShown = JSON.parse(
    localStorage.getItem("isOrderInfoModalShown") || ""
  );

  const closeOrderInfoModal = useCallback(() => {
    // dispatch(closeOrderInfoModalThunk());
    localStorage.setItem("isOrderInfoModalShown", "false");
    localStorage.removeItem("currentOrderInfoShown");
    navigate(-1);
  }, [navigate]);

  return (
    isOrderInfoModalShown && (
      <Modal onClose={closeOrderInfoModal}>
        <OrderModal order={currentOrder} />
      </Modal>
    )
  );
};
