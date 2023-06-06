import styles from "./ingredient-item-preview.module.css";

export const IngredientItemPreview = ({
  ingredient,
  number,
  isVisible: isOverlayed,
  index,
}) => {
  const iconOverlapStyle = {
    left: `${index * 48}px`,
    zIndex: `${10 - index}`,
  };

  return (
    <li style={iconOverlapStyle} className={styles.item}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${ingredient.image})`,
        }}
      >
        {isOverlayed && (
          <div className={styles.overlay}>
            <p className="text text_type_main-default">+{number}</p>
          </div>
        )}
      </div>
    </li>
  );
};
