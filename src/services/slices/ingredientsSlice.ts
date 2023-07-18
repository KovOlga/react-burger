import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TIngredientConstructor } from "../types/data";

export type TInitialState = {
  data: TIngredientConstructor[];
  dataRequest: boolean;
  dataFailed: boolean;
  currentBun: TIngredientConstructor | null | undefined;
  constructorIngredients: TIngredientConstructor[];
  totalPrice: number;
  isIngredientInfoModalShown: boolean;
};

const initialState: TInitialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  currentBun: null,
  constructorIngredients: [],

  totalPrice: 0,

  isIngredientInfoModalShown: false,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    GET_INGREDIENT_REQUEST: (state) => {
      state.dataRequest = true;
    },
    GET_INGREDIENT_SUCCESS: (
      state,
      action: PayloadAction<TIngredientConstructor[]>
    ) => {
      state.dataRequest = false;
      state.dataFailed = false;
      state.data = action.payload.map((item: any) => {
        return { ...item, counter: 0 };
      });
    },
    GET_INGREDIENT_FAILED: (state) => {
      state.dataFailed = true;
      state.dataRequest = false;
    },
    SET_CURRENT_BUN: (state, { payload }) => {
      state.currentBun = state.data.find((item) => item._id === payload);
    },
    UPDATE_TOTAL_PRICE: (state) => {
      let ingredientsPrice = 0;
      state.constructorIngredients.forEach((item) => {
        ingredientsPrice = ingredientsPrice + item.price;
      });
      const totalPrice =
        (!state.currentBun ? 0 : state.currentBun.price * 2) + ingredientsPrice;
      return {
        ...state,
        totalPrice: totalPrice,
      };
    },
    ADD_CONSTRUCTOR_ITEM: (
      state,
      action: PayloadAction<{ itemId: string; uuid: string }>
    ) => {
      const { itemId, uuid } = action.payload;
      const addedItem = state.data.find((item) => item._id === itemId);
      if (addedItem) {
        const uniqueId = uuid;
        const updatedItem = { ...addedItem, uniqueId };

        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            updatedItem,
          ],
        };
      } else {
        return { ...state };
      }
    },
    UPDATE_INGREDIENT_COUNTER: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient._id === payload) {
            const counter = state.constructorIngredients.filter((item) => {
              return item._id === payload;
            }).length;
            return { ...ingredient, counter: counter };
          }
          return ingredient;
        }),
      };
    },
    UPDATE_BUN_COUNTER: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient.type === "bun") {
            return ingredient._id === payload
              ? { ...ingredient, counter: 2 }
              : { ...ingredient, counter: 0 };
          }
          return ingredient;
        }),
      };
    },
    DELETE_CONSTRUCTOR_ITEM: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item) => item.uniqueId !== payload
        ),
      };
    },
    SORT_DRAGGING_ITEM: (
      state,
      { payload }: PayloadAction<{ hoverIndex: number; dragIndex: number }>
    ) => {
      const newConstructorArr = state.constructorIngredients.map(
        (item) => item
      );

      newConstructorArr[payload.hoverIndex] = newConstructorArr.splice(
        payload.dragIndex,
        1,
        newConstructorArr[payload.hoverIndex]
      )[0];

      return {
        ...state,
        constructorIngredients: newConstructorArr,
      };
    },
    CLEAR_CONSTRUCTOR: (state) => {
      return {
        ...state,
        currentBun: null,
        constructorIngredients: [],
      };
    },
    RESET_COUNTERS: (state) => {
      return {
        ...state,
        data: state.data.map((item) => {
          return { ...item, counter: 0 };
        }),
      };
    },
  },
});

export default ingredientsSlice.reducer;
export const {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,
  SET_CURRENT_BUN,
  UPDATE_BUN_COUNTER,
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_TOTAL_PRICE,
  RESET_COUNTERS,
  CLEAR_CONSTRUCTOR,
  SORT_DRAGGING_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
} = ingredientsSlice.actions;
