import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";
    this.forgotPasswordEndPoint = "password-reset";
    this.resetPasswordEndPoint = "password-reset/reset";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this.getResponse);
  }

  getIngredientsList = () => {
    return this._request(`${this.baseUrl}/${this.ingredientsEndPoint}`);
  };

  getOrderNumber = (ingredientsArr) => {
    return this._request(`${this.baseUrl}/${this.orderEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });
  };

  forgotPassword = (email) => {
    return this._request(`${this.baseUrl}/${this.forgotPasswordEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
      }),
    });
  };

  resetPassword = (password, token) => {
    return this._request(`${this.baseUrl}/${this.resetPasswordEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
  };
}

export default Api;
