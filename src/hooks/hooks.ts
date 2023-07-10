import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../services/types";

// type TdispatchFunc = () => AppDispatch | AppThunk;

// export const useAppDispatch: TdispatchFunc = dispatchHook;
export const useAppDispatch = () => dispatchHook<AppDispatch & AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
