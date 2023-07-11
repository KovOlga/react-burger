import { useCallback, FC } from "react";
import OrderModal from "../components/order-modal/order-modal";
import Modal from "../components/modal/modal";
import { useNavigate } from "react-router-dom";

export const OrderModalPage: FC = () => {
  const navigate = useNavigate();

  const currentOrder = JSON.parse(
    localStorage.getItem("currentOrderInfoShown") || ""
  );
  const isOrderInfoModalShown = JSON.parse(
    localStorage.getItem("isOrderInfoModalShown") || ""
  );

  const closeOrderInfoModal = useCallback(() => {
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
