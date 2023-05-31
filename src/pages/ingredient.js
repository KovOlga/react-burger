import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";

export const IngredientPage = () => {
  let { id } = useParams();
  console.log("1", id);

  return (
    <div>
      <IngredientDetails />
    </div>
  );
};
