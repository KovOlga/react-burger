import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { memo, useMemo, useRef, FC, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { getData } from "../../services/selectors/ingredients";
import { TIngredientCustom } from "../../services/types/data";

interface BurgerIngredientsProps {
  onOpenIngredientInfo: (ingredient: TIngredientCustom) => void; //// check
}

const BurgerIngredients: FC<BurgerIngredientsProps> = memo(
  ({ onOpenIngredientInfo }) => {
    const [current, setCurrent] = useState("Булки");

    const ingredients = useAppSelector(getData);

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const handleTabClick = (tab: HTMLHeadElement | null) => {
      if (!tab) {
        return;
      }
      tab.scrollIntoView({
        behavior: "smooth",
      });
    };

    const bunList = useMemo(
      () =>
        ingredients.filter((item: TIngredientCustom) => {
          return item.type === "bun";
        }),
      [ingredients]
    );

    const sauceList = useMemo(
      () =>
        ingredients.filter((item: TIngredientCustom) => {
          return item.type === "sauce";
        }),
      [ingredients]
    );

    const mainList = useMemo(
      () =>
        ingredients.filter((item: TIngredientCustom) => {
          return item.type === "main";
        }),
      [ingredients]
    );

    const tabsRef = useRef<HTMLDivElement>(null);

    const updatePositionOnScroll = () => {
      const tabsPositionY = Math.floor(
        tabsRef.current!.getBoundingClientRect().y
      );
      const bunsPositionY = Math.floor(
        bunRef.current!.getBoundingClientRect().y
      );
      const saucePositionY = Math.floor(
        sauceRef.current!.getBoundingClientRect().y
      );
      const mainPositionY = Math.floor(
        mainRef.current!.getBoundingClientRect().y
      );

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
              handleTabClick(bunRef.current);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="Соусы"
            active={current === "Соусы"}
            onClick={() => {
              setCurrent("Соусы");
              handleTabClick(sauceRef.current);
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={() => {
              setCurrent("Начинки");
              handleTabClick(mainRef.current);
            }}
          >
            Начинки
          </Tab>
        </div>

        <div onScroll={updatePositionOnScroll} className={styles.list__total}>
          <h2 ref={bunRef} className="text text_type_main-medium">
            Булки
          </h2>
          <ul className={`${styles.sublist__type} pl-4 pr-4`}>
            {bunList.map((item: TIngredientCustom) => {
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
            {sauceList.map((item: TIngredientCustom) => {
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
            {mainList.map((item: TIngredientCustom) => {
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
  }
);

export default BurgerIngredients;
