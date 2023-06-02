import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { memo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd/dist/hooks";
import Skeleton from "../skeleton/skeleton";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import {
  addConstructorItemAction,
  swapConstructorBunAction,
} from "../../services/actions/constructor";
import { getOrderNumber } from "../../services/actions/order";
import { useNavigate } from "react-router-dom";
import { UPDATE_TOTAL_PRICE } from "../../services/actions/constructor";
import { UPDATE_CONSTRUCTOR_EMPTINESS } from "../../services/actions/order";

const BurgerConstructor = memo(() => {
  const navigate = useNavigate();
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
    if (localStorage.getItem("isUserAuthed")) {
      const orderArr = [
        currentBun._id,
        ...constructorIngredients.map((ingredient) => {
          return ingredient._id;
        }),
        currentBun._id,
      ];
      dispatch(getOrderNumber(orderArr));
    } else {
      navigate("/login");
    }
  }, [constructorIngredients, currentBun, dispatch]);

  useEffect(() => {
    if (constructorIngredients.length < 1 || !currentBun) {
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
        {constructorIngredients.length || currentBun ? (
          <>
            <div>
              {currentBun && (
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
              {currentBun && (
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
