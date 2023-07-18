import { RootState } from "../store";

export const getUpdateUserRequest = (store: RootState) =>
  store.user.updateUserRequest;
export const getUser = (store: RootState) => store.user.user;
