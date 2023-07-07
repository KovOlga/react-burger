export interface TIngredient {
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
}

export interface TIngredientCustom extends TIngredient {
  counter: number;
}

export interface TOrder {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: TIngredientCustom[];
  createdAt: string;
}

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
