import styles from "./order-modal.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from "../Ingredient-icon/Ingredient-icon";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderType } from "../../utils/types";

const OrderModal = ({ order }) => {
  const getTimeZone = (dateFromServer) => {
    const timeZone = new Date(dateFromServer).toString().split(" ")[5];
    return timeZone;
  };
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-default">{`#${order.number}`}</p>
      <div className={styles.info}>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        <p className={`${styles.status} text text_type_main-default`}>
          {order.status === "done" ? "Выполнен" : "В процессе"}
        </p>
        <div className={styles.ingredients}>
          <h2 className="text text_type_main-medium">Состав:</h2>
          <ul className={styles.list}>
            {order.ingredients.map((ingredient, i) => {
              return (
                <li key={i} className={styles.list__item}>
                  <IngredientIcon
                    ingredient={ingredient}
                    index={0}
                    number={0}
                    position="relative"
                  />
                  <p className="text text_type_main-default">
                    {ingredient.name}
                  </p>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default">
                      <span>{ingredient.counter}</span>x
                      <span>{ingredient.price}</span>
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.updatedAt)} />
          <span> i-{getTimeZone(order.updatedAt)}</span>
        </p>
        <div className={styles.total}>
          <p className="text text_type_digits-default">{order.totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  order: orderType.isRequired,
};

export default OrderModal;
