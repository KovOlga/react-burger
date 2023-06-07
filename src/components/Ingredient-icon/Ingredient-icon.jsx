import styles from "./Ingredient-icon.module.css";

const IngredientIcon = ({ ingredient, number, index, position }) => {
  const iconOverlapStyle =
    position === "absolute"
      ? {
          position: "absolute",
          left: `${index * 48}px`,
          zIndex: `${10 - index}`,
        }
      : null;
  return (
    <div style={iconOverlapStyle} className={styles.item}>
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
