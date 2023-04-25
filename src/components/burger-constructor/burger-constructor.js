import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_CURRENT_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_TOTAL_PRICE,
} from "../../services/actions";
import { useDrop, useDrag } from "react-dnd/dist/hooks";
import Skeleton from "../skeleton/skeleton";
import {
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_BUN_COUNTER,
} from "../../services/actions/index";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

const BurgerConstructor = memo(({ onOpenConfirm }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector((store) => store.ingredients.totalPrice);

  const currentBun = useSelector((store) => store.ingredients.currentBun);
  const constructorIngredients = useSelector(
    (store) => store.ingredients.constructorIngredients
  );
  const orderNumberRequest = useSelector(
    (store) => store.orderNumber.orderNumberRequest
  );

  const changeConstructorBun = (item) => {
    const itemId = item._id;
    dispatch({ type: SET_CURRENT_BUN, item });
    dispatch({ type: UPDATE_BUN_COUNTER, itemId });
  };

  const addConstructorIngredient = (item) => {
    const itemId = item._id;
    dispatch({ type: ADD_CONSTRUCTOR_ITEM, item });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };

  const [, dropTarget] = useDrop({
    accept: ["ingredient", "bun"],
    drop(itemId) {
      if (itemId.type === "ingredient") {
        addConstructorIngredient(itemId);
      } else {
        changeConstructorBun(itemId);
      }
    },
  });

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_PRICE });
  }, [currentBun, constructorIngredients]);

  return (
    <section className={`${styles.section_constructor} pl-4 pr-4`}>
      <div ref={dropTarget} className={styles.incridients}>
        {constructorIngredients.length ||
        Object.keys(currentBun).length !== 0 ? (
          <>
            {Object.keys(currentBun).length !== 0 && (
              <ConstructorElement
                extraClass={styles.item__bun}
                key={"top"}
                type="top"
                isLocked={true}
                text={`${currentBun.name} (верх)`}
                price={currentBun.price}
                thumbnail={currentBun.image}
              />
            )}

            <ul className={styles.list}>
              {constructorIngredients.map((item) => {
                return (
                  <BurgerConstructorItem
                    key={item.uniqueId}
                    ingredient={item}
                    type="ingredient"
                  />
                );
              })}
            </ul>

            {Object.keys(currentBun).length !== 0 && (
              <ConstructorElement
                extraClass={styles.item__bun}
                key={"bottom"}
                type="bottom"
                isLocked={true}
                text={`${currentBun.name} (низ)`}
                price={currentBun.price}
                thumbnail={currentBun.image}
              />
            )}
          </>
        ) : (
          <Skeleton />
        )}
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
          {orderNumberRequest ? "Оформляется..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
});

BurgerConstructor.propTypes = {
  onOpenConfirm: PropTypes.func.isRequired,
};

export default BurgerConstructor;
