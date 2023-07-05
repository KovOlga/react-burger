import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../Ingredient-icon/Ingredient-icon";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { orderType } from "../../utils/types";
import { getTimeZone } from "../../utils/utils";

const OrderCard = ({ order, onClick, fromComponent }) => {
  const orderIngredients = order.ingredients.slice(0, 6);

  return (
    <li onClick={() => onClick(order)} className={styles.card}>
      <div className={styles.card__id}>
        <h3 className="text text_type_digits-default">{`#${order.number}`}</h3>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
          <span> i-{getTimeZone(order.createdAt)}</span>
        </p>
      </div>
      <div className={styles.info}>
        <h2 className={`${styles.name} text text_type_main-medium`}>
          {order.name}
        </h2>
        {fromComponent === "orders" && order.status === "done" && (
          <p className={`text text_type_main-default ${styles.done}`}>
            Выполнен
          </p>
        )}
        {fromComponent === "orders" && order.status !== "done" && (
          <p className="text text_type_main-default">
            {order.status === "pending"
              ? "Готовится"
              : order.status === "created"
              ? "Создан"
              : "Неизвестный статус"}
          </p>
        )}
      </div>
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

OrderCard.propTypes = {
  order: orderType.isRequired,
  onClick: PropTypes.func.isRequired,
  fromComponent: PropTypes.string.isRequired,
};

export default OrderCard;
