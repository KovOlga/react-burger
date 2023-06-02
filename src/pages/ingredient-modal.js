import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { closeIngredientModalAction } from "../services/actions/ingredient-modal";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

export const IngredientModalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentIngredient = JSON.parse(
    localStorage.getItem("currentIngredientShown")
  );
  const isIngredientInfoModalShown = JSON.parse(
    localStorage.getItem("isIngredientInfoModalShown")
  );

  const closeIngredientInfoModal = useCallback(() => {
    dispatch(closeIngredientModalAction());
    navigate(-1);
  }, []);

  return (
    isIngredientInfoModalShown && (
      <Modal onClose={closeIngredientInfoModal} container={modalRoot}>
        <IngredientDetails ingredient={currentIngredient} />
      </Modal>
    )
  );
};
