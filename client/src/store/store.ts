import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "features/authSlice";
import { rootSaga, sagaMiddleware } from "sagas/rootSaga";

export const store = configureStore({
  reducer: {
    auth:  authReducers ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type GlobalStore = typeof store;
export type RootState = ReturnType<GlobalStore["getState"]>;
export type AppDispatch = GlobalStore["dispatch"];
