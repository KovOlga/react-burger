import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../Ingredient-icon/Ingredient-icon";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderCard = ({ order, onClick }) => {
  const orderIngredients = order.ingredients.slice(0, 6);

  const getTimeZone = (dateFromServer) => {
    const timeZone = new Date(dateFromServer).toString().split(" ")[5];
    return timeZone;
  };

  return (
    <li onClick={() => onClick(order)} className={styles.card}>
      <div className={styles.card__id}>
        <h3 className="text text_type_digits-default">{`#${order.number}`}</h3>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
          <span> i-{getTimeZone(order.updatedAt)}</span>
        </p>
      </div>
      <h2 className={`${styles.name} text text_type_main-medium`}>
        {order.name}
      </h2>
      <div className={styles.card__bottom}>
        <ul className={styles.ingredients}>
          {orderIngredients.map((ingredient, index) => {
            return (
              <li key={index}>
                <IngredientIcon
                  ingredient={ingredient}
                  number={order.ingredients.length - 5}
                  index={index}
                  position="absolute"
                />
              </li>
            );
          })}
        </ul>
        <div className={styles.card_price}>
          <p className="text text_type_digits-default">{order.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};
