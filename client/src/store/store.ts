import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducers } from "features/authSlice";
import { rootSaga, sagaMiddleware } from "sagas/rootSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth:authReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type GlobalStore = typeof store;
export type RootState = ReturnType<GlobalStore["getState"]>;
export type AppDispatch = GlobalStore["dispatch"];
export const persistor = persistStore(store);
