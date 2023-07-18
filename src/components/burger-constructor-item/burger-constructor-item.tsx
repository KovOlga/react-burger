import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import { useAppDispatch } from "../../hooks/hooks";
import { useRef, FC } from "react";
import { deleteConstructorItemThunk } from "../../services/actions/constructor";
import { TIngredientConstructor } from "../../services/types/data";
import { SORT_DRAGGING_ITEM } from "../../services/slices/ingredientsSlice";

interface BurgerConstructorItemProps {
  ingredient: TIngredientConstructor;
  type: string;
  index: number;
}

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({
  ingredient,
  type,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const id = ingredient._id;

  const handleDelete = (uniqueId: string, itemId: string) => {
    dispatch(deleteConstructorItemThunk(itemId, uniqueId));
  };

  const [, drop] = useDrop({
    accept: "constructorItem",
    hover(item: { id: string; index: number }, monitor) {
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(SORT_DRAGGING_ITEM({ dragIndex, hoverIndex }));
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

export default BurgerConstructorItem;
