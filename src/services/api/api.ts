import { getCookie, handleTokens } from "../../utils/utils";
import {
  TConfirmedOrderResponse,
  TIngredientConstructor,
  TUserForm,
} from "../types/data";
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
  TTokenResponse,
  TUserResponse,
  TUserRegisterLoginResponse,
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
  });
};

export const getUserInfo = (): Promise<TUserResponse> => {
  return fetchWithRefresh(userEndPoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
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
  });
};

export const getNewOrderFetch = (
  ingredientsArr: string[]
): Promise<{
  success: boolean;
  name: string;
  order: TConfirmedOrderResponse;
}> => {
  return fetchWithRefresh(orderEndPoint, {
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

export const getIngredientsList = (): Promise<{
  success: boolean;
  data: TIngredientConstructor[];
}> => {
  return request(ingredientsEndPoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export const registerUser = ({
  email,
  password,
  name,
}: TUserForm): Promise<TUserRegisterLoginResponse> => {
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
}): Promise<TUserRegisterLoginResponse> => {
  return request(loginEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const logoutUser = (): Promise<{
  success: boolean;
  message: string;
}> => {
  const refreshToken = localStorage.getItem("refreshToken");
  return request(logoutEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

export const forgotPassword = (
  email: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  return request(forgotPasswordEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });
};

export const resetPassword = (
  password: string,
  token: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  return request(resetPasswordEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      token,
    }),
  });
};
