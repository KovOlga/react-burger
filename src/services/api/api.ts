import { getCookie, handleTokens } from "../../utils/utils";
import { TUserForm } from "../types/data";
import {
  ingredientsEndPoint,
  orderEndPoint,
  forgotPasswordEndPoint,
  resetPasswordEndPoint,
  loginEndPoint,
  registerEndPoint,
  logoutEndPoint,
  userEndPoint,
  updateTokenEndPoint,
} from "../../utils/constants";
import {
  TIngredient,
  TTokenResponse,
  TUserResponse,
  IUserRegisterLoginResponse,
} from "../types/data";

interface IOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
  body?: string;
}

const getResponse = async (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(await res.json());
};

const request = (url: string, options: IOptions) => {
  return fetch(url, options).then(getResponse);
};

export const fetchWithRefresh = async (url: string, options: IOptions) => {
  try {
    const res = await fetch(url, options);
    return await getResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      handleTokens(refreshData);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await getResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const updateToken = (): Promise<TTokenResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");
  return request(updateTokenEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).catch((err) => {
    console.log("err:", err);
  });
};

export const getUserInfo = (): Promise<TUserResponse> => {
  return fetchWithRefresh(userEndPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).catch((err) => {
    console.log("err:", err);
  });
};

export const updateUserInfo = ({
  name,
  email,
  password,
}: TUserForm): Promise<TUserResponse> => {
  return fetchWithRefresh(userEndPoint, {
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
    console.log("err:", err);
  });
};

export const getNewOrderFetch = (ingredientsArr: string[]) => {
  return fetchWithRefresh(orderEndPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: ingredientsArr,
    }),
  }).catch((err) => {
    console.log("err:", err);
  });
};

export const getIngredientsList = () => {
  return request(ingredientsEndPoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export const registerUser = ({
  email,
  password,
  name,
}: TUserForm): Promise<IUserRegisterLoginResponse> => {
  return request(registerEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUserRegisterLoginResponse> => {
  return request(loginEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const logoutUser = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return request(logoutEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

export const forgotPassword = (email: string) => {
  return request(forgotPasswordEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

export const resetPassword = (password: string, token: string) => {
  return request(resetPasswordEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};
