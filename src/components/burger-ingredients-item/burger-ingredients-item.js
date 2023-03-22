import styles from "./burger-ingredients-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

const BurgerIngredientsItem = ({ ingredient }) => {
  const { name, image, price } = ingredient;

  return (
    <li className={styles.burger__item}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className="pl-4 pr-4" src={image} alt={name}></img>
      <div className={`${styles.price_field} pb-1 pt-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{name}</h3>
    </li>
  );
};

export default BurgerIngredientsItem;
