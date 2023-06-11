import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { SORT_DRAGGING_ITEM } from "../../services/actions/constructor";
import { deleteConstructorItemAction } from "../../services/actions/constructor";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

const BurgerConstructorItem = ({ ingredient, type, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = ingredient._id;

  const handleDelete = (uniqueId, itemId) => {
    dispatch(deleteConstructorItemAction(itemId, uniqueId));
  };

  const [, drop] = useDrop({
    accept: "constructorItem",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: SORT_DRAGGING_ITEM,
        dragIndex,
        hoverIndex,
      });
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: type,
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  return (
    <li ref={ref} key={ingredient.uniqueId} className={styles.list__item}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={ingredient._id}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          handleDelete(ingredient.uniqueId, ingredient._id);
        }}
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  ingredient: ingredientType.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;
