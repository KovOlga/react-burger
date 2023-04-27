import styles from "./burger-ingredients-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";
import { memo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const BurgerIngredientsItem = memo(
  ({ ingredient, onIngredientClick, type }) => {
    const { name, image, price, _id, counter } = ingredient;

    const [, ref] = useDrag({
      type: type,
      item: { _id, type },
    });

    return (
      <li ref={ref} className={styles.burger__item} onClick={onIngredientClick}>
        {counter > 0 && (
          <Counter count={counter} size="default" extraClass="m-1" />
        )}
        <img className="pl-4 pr-4" src={image} alt={name}></img>
        <div className={`${styles.price_field} pb-1 pt-1`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className="text text_type_main-default">{name}</h3>
      </li>
    );
  }
);

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;
