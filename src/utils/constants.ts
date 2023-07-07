export const HOME_ROUTE = "/";
export const INGREDIENTS_ID_ROUTE = "/ingredients/:id";

export const FEED_ROUTE = "/feed";
export const FEED_ID_ROUTE = "/feed/:id";

export const PROFILE_ROUTE = "/profile";
export const PROFILE_ORDERS_ROUTE = "/profile/orders";
export const PROFILE_ORDERS_ID_ROUTE = "/profile/orders/:id";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";

export const modalRoot = document.getElementById("react-modals");

export const baseUrl = "https://norma.nomoreparties.space/api";
export const ingredientsEndPoint = `${baseUrl}/ingredients`;
export const orderEndPoint = `${baseUrl}/orders`;
export const forgotPasswordEndPoint = `${baseUrl}/password-reset`;
export const resetPasswordEndPoint = `${baseUrl}/password-reset/reset`;
export const loginEndPoint = `${baseUrl}/auth/login`;
export const registerEndPoint = `${baseUrl}/auth/register`;
export const logoutEndPoint = `${baseUrl}/auth/logout`;
export const userEndPoint = `${baseUrl}/auth/user`;
export const updateTokenEndPoint = `${baseUrl}/auth/token`;
