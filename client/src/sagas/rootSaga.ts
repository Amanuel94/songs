// import { all } from "axios";
import { authWatcherSaga } from "./authSaga";
import createSagaMiddleware from "redux-saga";

export const sagaMiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield authWatcherSaga();
}
