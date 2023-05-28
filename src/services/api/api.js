import React from "react";
import { getCookie, handleTokens } from "../../utils/utils";

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

    this.userEndPoint = "auth/user";

    this.updateTokenEndPoint = "auth/token";

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.json());
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

  updateToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("update1");
    return this._request(`${this.baseUrl}/${this.updateTokenEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  };

  getUserInfo = () => {
    console.log("getUserInfo1");
    return this._request(`${this.baseUrl}/${this.userEndPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    });
  };

  getUserInfoWithUpdateToken = async () => {
    try {
      return await this.getUserInfo();
    } catch (err) {
      console.log("err1", err);
      err.then((err) => {
        if (err.message === "jwt expired") {
          console.log("update2");
          return this.updateToken().then((res) => {
            console.log("tokens res", res);
            handleTokens(res);
          });
        }
      });
    }
  };

  updateUserInfo = ({ name, email, password }) => {
    return this._request(`${this.baseUrl}/${this.userEndPoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
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
}

export default Api;
