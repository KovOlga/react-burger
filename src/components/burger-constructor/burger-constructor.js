import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { memo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_TOTAL_PRICE,
  UPDATE_CONSTRUCTOR_EMPTINESS,
} from "../../services/actions";
import { useDrop } from "react-dnd/dist/hooks";
import Skeleton from "../skeleton/skeleton";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import {
  getOrderNumber,
  addConstructorItemAction,
  swapConstructorBunAction,
} from "../../services/actions";

const BurgerConstructor = memo(() => {
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
    dispatch(swapConstructorBunAction(item._id));
  };

  const addConstructorIngredient = (item) => {
    dispatch(addConstructorItemAction(item._id));
  };

  const openConfirm = useCallback(() => {
    const orderArr = [
      constructorIngredients.map((ingredient) => {
        return ingredient._id;
      }),
      Object.keys(currentBun).length === 0 ? [] : currentBun._id,
    ].flatMap((i) => i);
    dispatch(getOrderNumber(orderArr));
  }, [constructorIngredients, currentBun, dispatch]);

  useEffect(() => {
    if (
      constructorIngredients.length === 0 &&
      Object.keys(currentBun).length === 0
    ) {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: true });
    } else {
      dispatch({ type: UPDATE_CONSTRUCTOR_EMPTINESS, payload: false });
    }
  }, [constructorIngredients, currentBun]);

  const [{ canDrop }, dropTarget] = useDrop({
    accept: ["ingredient", "bun"],
    drop(itemId) {
      if (itemId.type === "ingredient") {
        addConstructorIngredient(itemId);
      } else {
        changeConstructorBun(itemId);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const isConstructorEmpty = useSelector(
    (store) => store.orderNumber.isConstructorEmpty
  );

  const containerClassName =
    canDrop && isConstructorEmpty
      ? `${styles.incridients} ${styles.drop_available}`
      : styles.incridients;

  useEffect(() => {
    dispatch({ type: UPDATE_TOTAL_PRICE });
  }, [currentBun, constructorIngredients]);

  return (
    <section className={`${styles.section_constructor} pl-4 pr-4`}>
      <div ref={dropTarget} className={containerClassName}>
        {constructorIngredients.length ||
        Object.keys(currentBun).length !== 0 ? (
          <>
            <div>
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
            </div>

            <ul className={styles.list}>
              {constructorIngredients.map((item, index) => {
                return (
                  <BurgerConstructorItem
                    key={item.uniqueId}
                    ingredient={item}
                    type="constructorItem"
                    index={index}
                  />
                );
              })}
            </ul>

            <div>
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
            </div>
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
          onClick={openConfirm}
          htmlType="button"
          type="primary"
          size="large"
          disabled={isConstructorEmpty}
        >
          {orderNumberRequest ? "Оформляется..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
});

export default BurgerConstructor;
