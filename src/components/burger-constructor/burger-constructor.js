import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import ingredientType from "../../utils/types";
import { memo, useMemo } from "react";

const BurgerConstructor = memo(
  ({ data, onOpenIngredientInfo, onOpenConfirm }) => {
    const ingredientsList = useMemo(
      () =>
        data.filter((item) => {
          console.log("Меня вызвали!");
          return item.type !== "bun";
        }),
      [data]
    );

    const random = Math.random() * 3;
    console.log(`BurgerConstructor ${random}`);
    return (
      <section className={`${styles.section_constructor} pl-4 pr-4`}>
        <div className={styles.incridients}>
          <ConstructorElement
            extraClass={styles.item__bun}
            key={"top"}
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />

          <ul className={styles.list}>
            {ingredientsList.map((item) => {
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
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>

        <div className={styles.total}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">610</p>
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
  }
);

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;
