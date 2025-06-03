import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducers } from "features/authSlice";
import {  sagaMiddleware } from "sagas/rootSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { updateSongReducers } from "features/updateSlice";
import { songApiReducers } from "features/songApiSlice";
import { authWatcherSaga } from "sagas/authSaga";
import { songWatcherSaga } from "sagas/songSaga";
import { pageNumberReducers } from "features/pageSlice";
import { indicatorReducers } from "features/indicator";
const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  auth:authReducers,
  updateSong: updateSongReducers,
  songsApi: songApiReducers,
  page: pageNumberReducers,
  indicator: indicatorReducers,
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

// sagaMiddleware.run(rootSaga);
sagaMiddleware.run(authWatcherSaga);
sagaMiddleware.run(songWatcherSaga);


export type GlobalStore = typeof store;
export type RootState = ReturnType<GlobalStore["getState"]>;
export type AppDispatch = GlobalStore["dispatch"];
export const persistor = persistStore(store);
