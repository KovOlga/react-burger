import styles from "./ingredient-details.module.css";
import ingredientType from "../../utils/types";
import { useParams } from "react-router-dom";

const IngredientDetails = ({ ingredient }) => {
  let { id } = useParams();
  console.log(id);

  return (
    <div className={styles.container}>
      <h1 className={`text text_type_main-large ${styles.title}`}>
        Детали ингредиента
      </h1>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <h2 className={`text text_type_main-medium pt-4 ${styles.name}`}>
        {ingredient.name}
      </h2>
      <div className={styles.info_container}>
        <div className={styles.info_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.info_item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.info_item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.info_item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientDetails;
