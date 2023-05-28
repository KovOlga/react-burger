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

    this.userEndPoint = "auth/user";

    this.updateTokenEndPoint = "auth/token";

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

  loginUser = ({ email, password }) => {
    return this._request(`${this.baseUrl}/${this.loginEndPoint}`, {
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
    return this._request(`${this.baseUrl}/${this.updateTokenEndPoint}`, {
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
        return this._request(`${this.baseUrl}/${fetchUrlEndPoint}`, options);
      })
      .catch((err) => {
        console.log("err in updateToken", err);
      });
  };

  // access token for expire test:
  // "Bearer " +
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmZhYjg1OGE0YjYyMDAxYzgzZWM3YiIsImlhdCI6MTY4NTI5NzE5NSwiZXhwIjoxNjg1Mjk4Mzk1fQ.7-0A5-ffzhWHCdT1eJzu4avbEi-Ua8hbgp-TnKkiza4",

  getUserInfo = () => {
    return this._request(`${this.baseUrl}/${this.userEndPoint}`, {
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
    const refreshToken = localStorage.getItem("refreshToken");
    return this._request(`${this.baseUrl}/${this.logoutEndPoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  };
}

export default Api;
