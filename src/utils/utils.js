export function parseOrderIngredients(data, order) {
  let updatedOrder = {};

  const orderedIngredients = order.ingredients.reduce((prevVal, item) => {
    let ingredient = data.find((ingredient) => ingredient._id === item);
    const isIngredientRepeated = prevVal.findIndex(
      (element) => element._id === ingredient._id
    );
    if (isIngredientRepeated >= 0) {
      prevVal[isIngredientRepeated].counter++;
    } else {
      ingredient.counter = 1;
      prevVal = [...prevVal, ingredient];
    }

    return prevVal;
  }, []);

  updatedOrder = {
    ...order,
    ingredients: orderedIngredients,
  };

  const totalPrice = orderedIngredients.reduce((prevVal, item) => {
    return (prevVal = prevVal + item.price * item.counter);
  }, 0);
  updatedOrder.totalPrice = totalPrice;

  return updatedOrder;
}

export const getTimeZone = (dateFromServer) => {
  const timeZone = new Date(dateFromServer).toString().split(" ")[5];
  return timeZone;
};

export function handleTokens(data) {
  localStorage.setItem("refreshToken", data.refreshToken);
  let authToken;
  if (data.accessToken.indexOf("Bearer") === 0) {
    authToken = data.accessToken.split("Bearer ")[1];
  }
  if (authToken) {
    setCookie("token", authToken);
  }
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
