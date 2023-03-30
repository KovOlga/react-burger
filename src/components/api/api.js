import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
  }

  getResourse = async (url) => {
    let res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getIngredientsList = () => {
    return this.getResourse(`${this.baseUrl}/${this.ingredientsEndPoint}`);
  };
}

export default Api;
