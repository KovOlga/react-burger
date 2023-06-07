export const TOGGLE_ORDER_INFO_MODAL = "TOGGLE_ORDER_INFO_MODAL";

export const openOrderInfoModalAction = (item) => {
  return (dispatch) => {
    localStorage.setItem("isOrderInfoModalShown", true);
    localStorage.setItem("currentOrderInfoShown", JSON.stringify(item));
  };
};

export const closeOrderInfoModalAction = () => {
  return (dispatch) => {
    localStorage.setItem("isOrderInfoModalShown", false);
    localStorage.removeItem("currentOrderInfoShown");
  };
};
