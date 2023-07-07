import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../services/types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
