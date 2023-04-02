import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { memo, useMemo } from "react";

const BurgerIngredients = memo(({ data, onOpenIngredientInfo }) => {
  const [current, setCurrent] = React.useState("Булки");

  const bunList = useMemo(
    () =>
      data.filter((item) => {
        return item.type === "bun";
      }),
    [data]
  );

  const sauceList = useMemo(
    () =>
      data.filter((item) => {
        return item.type === "sauce";
      }),
    [data]
  );

  const mainList = useMemo(
    () =>
      data.filter((item) => {
        return item.type === "main";
      }),
    [data]
  );

  return (
    <section className={styles.section__ingredients}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.list__total}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {bunList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => onOpenIngredientInfo(item)}
                ingredient={item}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {sauceList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => onOpenIngredientInfo(item)}
                ingredient={item}
              />
            );
          })}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {mainList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => onOpenIngredientInfo(item)}
                ingredient={item}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
