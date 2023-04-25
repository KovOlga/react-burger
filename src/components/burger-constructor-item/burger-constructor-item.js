import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_INGREDIENT_COUNTER,
} from "../../services/actions";

const BurgerConstructorItem = ({ ingredient, type }) => {
  const dispatch = useDispatch();
  //   const [, ref] = useDrag({
  //     type: type,
  //     item: { _id, type },
  //   });

  const handleClose = (uniqueId, itemId) => {
    dispatch({ type: DELETE_CONSTRUCTOR_ITEM, uniqueId });
    dispatch({ type: UPDATE_INGREDIENT_COUNTER, itemId });
  };

  return (
    <li key={ingredient.uniqueId} className={styles.list__item}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={ingredient._id}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          handleClose(ingredient.uniqueId, ingredient._id);
        }}
      />
    </li>
  );
};

export default BurgerConstructorItem;
