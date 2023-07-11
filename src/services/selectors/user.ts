import { RootState } from "../types";

export const getUpdateUserRequest = (store: RootState) =>
  store.user.updateUserRequest;
export const getUser = (store: RootState) => store.user.user;
