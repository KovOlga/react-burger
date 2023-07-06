import styles from "./burger-ingredients-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, FC } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredientCustom } from "../../services/types/data";

interface BurgerIngredientsItemProps {
  ingredient: TIngredientCustom;
  onIngredientClick: () => void; ///// check
  type: string;
}

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = memo(
  ({ ingredient, onIngredientClick, type }) => {
    const { name, image, price, _id, counter } = ingredient;

    const [, ref] = useDrag({
      type: type,
      item: { _id, type },
    });

    let location = useLocation();

    return (
      <Link
        className={styles.link}
        to={`/ingredients/${_id}`}
        state={{ background: location }}
      >
        <li
          ref={ref}
          className={styles.burger__item}
          onClick={onIngredientClick}
        >
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
      </Link>
    );
  }
);

export default BurgerIngredientsItem;
