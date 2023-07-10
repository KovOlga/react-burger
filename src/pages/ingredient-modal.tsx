import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const IngredientModalPage = () => {
  const navigate = useNavigate();

  const currentIngredient = localStorage.getItem("currentIngredientShown");
  const isIngredientInfoModalShown = localStorage.getItem(
    "isIngredientInfoModalShown"
  );

  const closeIngredientInfoModal = useCallback(() => {
    localStorage.setItem("isIngredientInfoModalShown", "false");
    localStorage.removeItem("currentIngredientShown");
    navigate(-1);
  }, [navigate]);

  console.log("IngredientModalPage");
  return (
    <>
      {isIngredientInfoModalShown && currentIngredient && (
        <Modal onClose={closeIngredientInfoModal}>
          <IngredientDetails ingredient={JSON.parse(currentIngredient)} />
        </Modal>
      )}
    </>
  );
};
