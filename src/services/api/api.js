import React from "react";
import { getCookie } from "../../utils/cookies";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = "ingredients";
    this.orderEndPoint = "orders";

    this.forgotPasswordEndPoint = "password-reset";
    this.resetPasswordEndPoint = "password-reset/reset";

    this.loginEndPoint = "auth/login";
    this.registerEndPoint = "auth/register";
    this.logoutEndPoint = "auth/logout";
    this.updateTokenEndPoint = "auth/token";

    this.userInfoEndPoint = "auth/user";

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
        password,
        token,
      }),
    });
  };

  loginUser = ({ email, password, name }) => {
    return this._request(`${this.baseUrl}/${this.loginEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  };

  getUser = () => {
    return this._request(`${this.baseUrl}/${this.userInfoEndPoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    });
  };

  registerUser = ({ email, password, name }) => {
    return this._request(`${this.baseUrl}/${this.registerEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  };

  logoutUser = () => {
    return this._request(`${this.baseUrl}/${this.logoutEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: "test-data@yandex.ru",
        password: "password",
        name: "Username",
      }),
    });
  };

  updateToken = () => {
    return this._request(`${this.baseUrl}/${this.logoutEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: "test-data@yandex.ru",
        password: "password",
        name: "Username",
      }),
    });
  };
}

export default Api;
