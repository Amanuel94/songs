import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, GlobalStore, RootState } from "store/store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<GlobalStore>(); 