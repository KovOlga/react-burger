import styles from "./ingredients-list-preview.module.css";
import { IngredientItemPreview } from "../ingredient-item-preview/ingredient-item-preview";

export const IngredientsListPreview = ({ data, orderIngredientsIdArray }) => {
  const orderIngredientIdNewArray = orderIngredientsIdArray.slice(0, 6);

  let visibleImgs = [];

  orderIngredientIdNewArray.forEach((orderIngredientId) => {
    visibleImgs = [
      ...visibleImgs,
      data.find((ingredient) => ingredient._id === orderIngredientId),
    ];
  });

  return (
    <ul className={styles.ingredients}>
      {visibleImgs.map((ingredient, index) => {
        return (
          <IngredientItemPreview
            ingredient={ingredient}
            key={index}
            number={orderIngredientsIdArray.length - 5}
            isOverlayed={index > 4}
            index={index}
          />
        );
      })}
    </ul>
  );
};
