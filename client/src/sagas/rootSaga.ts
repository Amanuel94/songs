// import { all } from "axios";
// import { all } from "axios";
import { authWatcherSaga } from "./authSaga";
import createSagaMiddleware from "redux-saga";
// import { songWatcherSaga } from "./songSaga
export const sagaMiddleware = createSagaMiddleware();
export function* rootSaga() {
  yield authWatcherSaga();
}
