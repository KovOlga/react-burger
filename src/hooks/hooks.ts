import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../services/types";

export const useCustomDispatch = () => useDispatch<AppDispatch>();
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
