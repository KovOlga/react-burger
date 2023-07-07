import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useAppDispatch } from "../hooks/hooks";
import { useCallback } from "react";
import { closeIngredientModalThunk } from "../services/actions/ingredient-modal";
import { useNavigate } from "react-router-dom";

export const IngredientModalPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentIngredient = JSON.parse(
    localStorage.getItem("currentIngredientShown")
  );
  const isIngredientInfoModalShown = JSON.parse(
    localStorage.getItem("isIngredientInfoModalShown")
  );

  const closeIngredientInfoModal = useCallback(() => {
    dispatch(closeIngredientModalThunk());
    navigate(-1);
  }, [dispatch, navigate]);

  return (
    isIngredientInfoModalShown && (
      <Modal onClose={closeIngredientInfoModal}>
        <IngredientDetails ingredient={currentIngredient} />
      </Modal>
    )
  );
};
