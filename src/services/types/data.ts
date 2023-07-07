export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  isLocked: boolean;
  price: number;
  image: string;
};

export type TIngredientCustom = {
  _id: string;
  name: string;
  type: string;
  isLocked: boolean;
  price: number;
  image: string;
  counter: number;
};

export type TOrder = {
  _id: string;
  name: string;
  number: number;
  status: string;
  ingredients: TIngredient[];
  createdAt: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TUserForm = {
  name: string;
  email: string;
  password: string;
};
