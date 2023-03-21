import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("Булки");

  const bunList = data.filter((item) => item.type === "bun");
  const sauceList = data.filter((item) => item.type === "sauce");
  const mainList = data.filter((item) => item.type === "main");

  return (
    <section className={styles.burger__ingredients}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      <div style={{ display: "flex" }}>
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

      <div className={styles.ingredients__list}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {bunList.map((item) => {
            const { id, ...itemProps } = item;
            return <BurgerIngredientsItem key={item._id} {...itemProps} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {sauceList.map((item) => {
            const { id, ...itemProps } = item;
            return <BurgerIngredientsItem key={item._id} {...itemProps} />;
          })}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {mainList.map((item) => {
            const { id, ...itemProps } = item;
            return <BurgerIngredientsItem key={item._id} {...itemProps} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
