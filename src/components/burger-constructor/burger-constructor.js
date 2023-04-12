import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import ingredientType from "../../utils/types";
import { memo, useMemo, useContext, useEffect } from "react";
import { IngredientsContext } from "../../services/contexts/ingredientsContext";
import { TotalPriceContext } from "../../services/contexts/totalPriceContext";
import { ConstructorContext } from "../../services/contexts/ingredientsContext";

const BurgerConstructor = memo(({ onOpenIngredientInfo, onOpenConfirm }) => {
  const { bun, constructorIngredients } = useContext(ConstructorContext);
  const { totalPrice } = useContext(TotalPriceContext);

  return (
    <section className={`${styles.section_constructor} pl-4 pr-4`}>
      <div className={styles.incridients}>
        <ConstructorElement
          extraClass={styles.item__bun}
          key={"top"}
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />

        <ul className={styles.list}>
          {constructorIngredients.map((item) => {
            return (
              <li
                key={item._id}
                className={styles.list__item}
                onClick={() => onOpenIngredientInfo(item)}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          })}
        </ul>

        <ConstructorElement
          extraClass={styles.item__bun}
          key={"bottom"}
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={styles.total}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={onOpenConfirm}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
});

// BurgerConstructor.propTypes = {
//   data: PropTypes.arrayOf(ingredientType).isRequired,
// };

export default BurgerConstructor;
