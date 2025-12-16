import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typisierte Version von useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typisierte Version von useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
