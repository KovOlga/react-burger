import {
  TIngredientCounted,
  TTokenResponse,
  TUpdatedOrder,
  TwsOrderResponse,
} from "../services/types/data";

export const parseOrderIngredients = (
  data: TIngredientCounted[],
  order: TwsOrderResponse
): TUpdatedOrder => {
  let updatedOrder: TUpdatedOrder;

  const orderedIngredients = order.ingredients.reduce(
    (prevVal: TIngredientCounted[], item) => {
      let ingredient = data.find((elem) => elem._id === item);

      if (ingredient) {
        const isIngredientRepeated = prevVal.findIndex(
          (element) => element._id === ingredient?._id
        );

        if (isIngredientRepeated >= 0) {
          prevVal[isIngredientRepeated].counter++;
        } else {
          ingredient.counter = 1;
          prevVal = [...prevVal, ingredient];
        }
      }

      return prevVal;
    },
    []
  );

  updatedOrder = {
    ...order,
    ingredients: orderedIngredients,
    totalPrice: 0,
  };

  const totalPrice = orderedIngredients.reduce((prevVal, item) => {
    return (prevVal = prevVal + item.price * item.counter);
  }, 0);
  updatedOrder.totalPrice = totalPrice;

  return updatedOrder;
};

export const getTimeZone = (dateFromServer: string) => {
  const timeZone = new Date(dateFromServer).toString().split(" ")[5];
  return timeZone;
};

export function handleTokens(data: TTokenResponse) {
  localStorage.setItem("refreshToken", data.refreshToken);
  let authToken;
  if (data.accessToken.indexOf("Bearer") === 0) {
    authToken = data.accessToken.split("Bearer ")[1];
  }
  if (authToken) {
    setCookie("token", authToken);
  }
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | null,
  props?: Record<string, string | Date | boolean | number> | undefined
) {
  if (props) {
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }

    if (exp instanceof Date) {
      props.expires = exp.toUTCString();
    }
  }

  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
