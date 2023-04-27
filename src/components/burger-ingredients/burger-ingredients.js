import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import PropTypes from "prop-types";
import { memo, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

const BurgerIngredients = memo(({ onOpenIngredientInfo }) => {
  const [current, setCurrent] = React.useState("Булки");

  const ingredients = useSelector((store) => store.ingredients.data);

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const handleTabClick = (ref) => {
    const elmnt = ref;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const bunList = useMemo(
    () =>
      ingredients.filter((item) => {
        return item.type === "bun";
      }),
    [ingredients]
  );

  const sauceList = useMemo(
    () =>
      ingredients.filter((item) => {
        return item.type === "sauce";
      }),
    [ingredients]
  );

  const mainList = useMemo(
    () =>
      ingredients.filter((item) => {
        return item.type === "main";
      }),
    [ingredients]
  );

  const tabsRef = useRef();

  const updatePosition = () => {
    const tabsPositionY = Math.floor(tabsRef.current.getBoundingClientRect().y);
    const bunsPositionY = Math.floor(bunRef.current.getBoundingClientRect().y);
    const saucePositionY = Math.floor(
      sauceRef.current.getBoundingClientRect().y
    );
    const mainPositionY = Math.floor(mainRef.current.getBoundingClientRect().y);

    const bunsDistance = Math.abs(tabsPositionY - bunsPositionY);
    const sauceDistance = Math.abs(tabsPositionY - saucePositionY);
    const mainDistance = Math.abs(tabsPositionY - mainPositionY);

    if (bunsDistance < sauceDistance && bunsDistance < mainDistance) {
      setCurrent("Булки");
    } else if (sauceDistance < bunsDistance && sauceDistance < mainDistance) {
      setCurrent("Соусы");
    } else if (mainDistance < bunsDistance && mainDistance < sauceDistance) {
      setCurrent("Начинки");
    }
  };

  return (
    <section className={styles.section__ingredients}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      <div ref={tabsRef} className={styles.tabs}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={() => {
            setCurrent("Булки");
            handleTabClick(bunRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={() => {
            setCurrent("Соусы");
            handleTabClick(sauceRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={() => {
            setCurrent("Начинки");
            handleTabClick(mainRef);
          }}
        >
          Начинки
        </Tab>
      </div>

      <div onScroll={updatePosition} className={styles.list__total}>
        <h2 ref={bunRef} className="text text_type_main-medium">
          Булки
        </h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {bunList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                }}
                ingredient={item}
                type="bun"
              />
            );
          })}
        </ul>
        <h2 ref={sauceRef} className="text text_type_main-medium">
          Соусы
        </h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {sauceList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                }}
                ingredient={item}
                type="ingredient"
              />
            );
          })}
        </ul>
        <h2 ref={mainRef} className="text text_type_main-medium">
          Начинки
        </h2>
        <ul className={`${styles.sublist__type} pl-4 pr-4`}>
          {mainList.map((item) => {
            return (
              <BurgerIngredientsItem
                key={item._id}
                onIngredientClick={() => {
                  onOpenIngredientInfo(item);
                }}
                ingredient={item}
                type="ingredient"
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
