import { useCallback } from "react";
import { useDispatch } from "react-redux";
import OrderModal from "../components/order-modal/order-modal";
import Modal from "../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { closeOrderInfoModalThunk } from "../services/actions/order-info-modal";

export const FeedModalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentOrder = JSON.parse(
    localStorage.getItem("currentOrderInfoShown")
  );
  const isOrderInfoModalShown = JSON.parse(
    localStorage.getItem("isOrderInfoModalShown")
  );

  const closeOrderInfoModal = useCallback(() => {
    dispatch(closeOrderInfoModalThunk());
    navigate(-1);
  }, [dispatch, navigate]);

  return (
    isOrderInfoModalShown && (
      <Modal onClose={closeOrderInfoModal}>
        <OrderModal order={currentOrder} />
      </Modal>
    )
  );
};