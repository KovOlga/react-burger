import styles from "./Ingredient-icon.module.css";
import { FC } from "react";
import { TIngredientCounted } from "../../services/types/data";

interface IngredientIconProps {
  ingredient: TIngredientCounted;
  number: number;
  index: number;
  position: string;
}

const IngredientIcon: FC<IngredientIconProps> = ({
  ingredient,
  number,
  index,
  position,
}) => {
  return (
    <div
      style={
        position === "absolute"
          ? {
              position: "absolute",
              left: `${index * 48}px`,
              zIndex: `${10 - index}`,
            }
          : {}
      }
      className={styles.item}
    >
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${ingredient.image})`,
        }}
      >
        {index > 4 && (
          <div className={styles.overlay}>
            <p className="text text_type_main-default">+{number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientIcon;
