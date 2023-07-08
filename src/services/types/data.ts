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

export type TOrder = {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: TIngredient[];
  createdAt: string;
  updatedAt: string;
};

export type TOrderCounted = TOrder & {
  totalPrice: number;
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

export type TTokenResponse = {
  success?: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};

export type TwsOrdersResponse = {
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};
