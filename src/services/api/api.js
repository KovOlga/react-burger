import React from "react";
import { getCookie, handleTokens } from "../../utils/utils";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://norma.nomoreparties.space/api";
    this.ingredientsEndPoint = `${this.baseUrl}/ingredients`;
    this.orderEndPoint = `${this.baseUrl}/orders`;

    this.forgotPasswordEndPoint = `${this.baseUrl}/password-reset`;
    this.resetPasswordEndPoint = `${this.baseUrl}/password-reset/reset`;

    this.loginEndPoint = `${this.baseUrl}/auth/login`;
    this.registerEndPoint = `${this.baseUrl}/auth/register`;
    this.logoutEndPoint = `${this.baseUrl}/auth/logout`;

    this.userEndPoint = `${this.baseUrl}/auth/user`;

    this.updateTokenEndPoint = `${this.baseUrl}/auth/token`;

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(await res.json());
  }

  _request(url, options) {
    return fetch(url, options).then(this.getResponse);
  }

  getIngredientsList = () => {
    return this._request(this.ingredientsEndPoint);
  };

  getOrderNumber = (ingredientsArr) => {
    return this._request(this.orderEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });
  };

  forgotPassword = (email) => {
    return this._request(this.forgotPasswordEndPoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
      }),
    });
  };

  resetPassword = (password, token) => {
    return this._request(this.resetPasswordEndPoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password,
        token,
      }),
    });
  };

  loginUser = ({ email, password }) => {
    return this._request(this.loginEndPoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  };

  updateToken = (fetchUrlEndPoint, options) => {
    const refreshToken = localStorage.getItem("refreshToken");
    return this._request(this.updateTokenEndPoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
      .then((res) => {
        handleTokens(res);
      })
      .then(() => {
        return this._request(fetchUrlEndPoint, options);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  getUserInfo = () => {
    return this._request(this.userEndPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
    }).catch((err) => {
      if (err.message === "jwt expired") {
        return this.updateToken(this.userEndPoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        });
      }
    });
  };

  updateUserInfo = ({ name, email, password }) => {
    return this._request(this.userEndPoint, {
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
    }).catch((err) => {
      if (err.message === "jwt expired") {
        return this.updateToken(this.userEndPoint, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
          },
        });
      }
    });
  };

  registerUser = ({ email, password, name }) => {
    return this._request(this.registerEndPoint, {
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
    const refreshToken = localStorage.getItem("refreshToken");
    return this._request(this.logoutEndPoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  };
}

export default Api;
