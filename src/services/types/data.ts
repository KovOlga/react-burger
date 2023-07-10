export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  isLocked: boolean;
  price: number;
  image: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

export type TIngredientCounted = TIngredient & {
  counter: number;
};

export type TIngredientConstructor = TIngredientCounted & {
  uniqueId: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TUserResponse = {
  success: boolean;
  user: {
    name: string;
    email: string;
  };
};

export type IUserRegisterLoginResponse = TTokenResponse & TUserResponse;

export type TUserForm = {
  name: string;
  email: string;
  password: string;
};

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = {
  password: string;
  code: string;
};

export type TTokenResponse = {
  success?: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type TwsOrdersResponse = {
  orders: TwsOrderResponse[];
  total: number;
  totalToday: number;
};

export type TwsOrderResponse = {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
};

export type TUpdatedOrder = {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: TIngredientCounted[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
};
