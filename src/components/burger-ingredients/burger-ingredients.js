import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { memo, useMemo, useContext } from "react";
import { IngredientsContext } from "../../services/contexts/ingredientsContext";
import { ConstructorContext } from "../../services/contexts/ingredientsContext";
import { TotalPriceContext } from "../../services/contexts/totalPriceContext";

const BurgerIngredients = memo(({ onOpenIngredientInfo }) => {
  const { totalPriceDispatcher } = useContext(TotalPriceContext);
  const data = useContext(IngredientsContext);
  const { setBun, setConstructorIngredients, constructorIngredients } =
    useContext(ConstructorContext);
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
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                  setBun(item);
                }}
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
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                  const isAdded = constructorIngredients.some((ingredient) => {
                    return ingredient._id === item._id;
                  });
                  if (!isAdded) {
                    setConstructorIngredients((constructorIngredients) => [
                      ...constructorIngredients,
                      item,
                    ]);
                    totalPriceDispatcher({
                      type: "add",
                      payload: item.price,
                    });
                  }
                }}
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
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                  const isAdded = constructorIngredients.some((ingredient) => {
                    return ingredient._id === item._id;
                  });
                  if (!isAdded) {
                    setConstructorIngredients((constructorIngredients) => [
                      ...constructorIngredients,
                      item,
                    ]);
                    totalPriceDispatcher({
                      type: "add",
                      payload: item.price,
                    });
                  }
                }}
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
  onOpenIngredientInfo: PropTypes.func.isRequired,
};

export default BurgerIngredients;
