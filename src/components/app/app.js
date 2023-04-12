import React from "react";
import { useEffect, useState, useCallback, useReducer } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Api from "../../services/api/api";
import { IngredientsContext } from "../../services/contexts/ingredientsContext";
import { TotalPriceContext } from "../../services/contexts/totalPriceContext";
import { ConstructorContext } from "../../services/contexts/ingredientsContext";
import { defaultIngredient } from "../../utils/defaultData";
import { defaultBun } from "../../utils/defaultData";

const modalRoot = document.getElementById("react-modals");
const api = new Api();

const totalPriceInitialValue = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });

  const [bun, setBun] = useState(defaultBun);
  const [constructorIngredients, setConstructorIngredients] = useState([
    defaultIngredient,
  ]);
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialValue,
    undefined
  );
  const [orderNumber, setOrderNumber] = useState(null);

  const [popupIsOpen, setPopup] = useState(false);
  const [currentIngredient, setIngredient] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (() => {
      setState({ ...state, hasError: false, isLoading: true });
      api
        .getIngredientsList()
        .then(({ data }) => setState({ ...state, data, isLoading: false }))
        .catch((e) => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    })();
  }, []);

  const togglePopup = () => {
    setPopup(!popupIsOpen);
  };

  const openIngredientInfo = useCallback((item) => {
    setIngredient(item);
    setIsActive(true);
    togglePopup();
  }, []);

  const openConfirm = useCallback(() => {
    const orderArr = constructorIngredients
      .map((ingredient) => {
        return ingredient._id;
      })
      .concat(bun._id);
    api
      .getOrderNumber(orderArr)
      .then((res) => {
        if (res.success) {
          setOrderNumber(res.order.number);
        }
      })
      .then(() => {
        setIsActive(false);
        togglePopup();
      })
      .catch((e) => {
        console.log("error");
      });
  }, [constructorIngredients, togglePopup, bun._id]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && "Загрузка..."}
        {state.hasError && "Произошла ошибка"}
        {!state.isLoading && !state.hasError && state.data.length && (
          <IngredientsContext.Provider value={state.data}>
            <ConstructorContext.Provider
              value={{
                bun,
                setBun,
                constructorIngredients,
                setConstructorIngredients,
              }}
            >
              <TotalPriceContext.Provider
                value={{ totalPriceState, totalPriceDispatcher }}
              >
                <BurgerIngredients onOpenIngredientInfo={openIngredientInfo} />

                <BurgerConstructor
                  onOpenIngredientInfo={openIngredientInfo}
                  onOpenConfirm={openConfirm}
                />
              </TotalPriceContext.Provider>
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        )}
      </main>
      {popupIsOpen && (
        <Modal onClose={togglePopup} container={modalRoot}>
          {isActive ? (
            <IngredientDetails ingredient={currentIngredient} />
          ) : (
            <OrderDetails orderId={orderNumber} />
          )}
        </Modal>
      )}
    </>
  );
};

export default App;
