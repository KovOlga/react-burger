import { useCallback } from "react";
import { useDispatch } from "react-redux";
import OrderModal from "../components/order-modal/order-modal";
import Modal from "../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { closeOrderInfoModalAction } from "../services/actions/order-info-modal";

const modalRoot = document.getElementById("react-modals");

export const OrderModalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentOrder = JSON.parse(
    localStorage.getItem("currentOrderInfoShown")
  );
  const isOrderInfoModalShown = JSON.parse(
    localStorage.getItem("isOrderInfoModalShown")
  );

  const closeOrderInfoModal = useCallback(() => {
    dispatch(closeOrderInfoModalAction());
    navigate(-1);
  }, [dispatch, navigate]);

  return (
    isOrderInfoModalShown && (
      <Modal onClose={closeOrderInfoModal} container={modalRoot}>
        <OrderModal order={currentOrder} />
      </Modal>
    )
  );
};
