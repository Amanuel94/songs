import { all, call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "../features/authSlice";
import { loginUser, registerUser } from "../api/authApi";
import { AuthActionType, AuthResponse } from "@types";

function* loginSaga(action: AuthActionType) {
  try {
    const { username, password } = action.payload.req;
    const response: AuthResponse = yield call(loginUser, username, password);
    if (response.status === 200) {
      yield put(authActions.loginSuccess(response.data));
    } else if (response.status != 500) {
      yield put(authActions.loginFailure(response.data));
    } else {
      yield put(authActions.loginFailure({ message: "Internal Server Error" }));
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Login failed";
    yield put(authActions.loginFailure({ message: errorMessage }));
  }
}

function* logoutSaga() {
  yield put(authActions.logoutSuccess({}));
}

function* registerSaga(action: AuthActionType) {
  try {
    const { username, password } = action.payload.req;
    const response: AuthResponse = yield call(registerUser, username, password);
    console.log("Register response:", response);
    if (response.status === 201) {
      yield put(authActions.loginSuccess(response.data));
    } else if (response.status !== 500) {
      yield put(authActions.loginFailure(response.data));
    } else {
      yield put(authActions.loginFailure({ message: "Internal Server Error" }));
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Registration failed";
    yield put(authActions.loginFailure({ message: errorMessage }));
  }
}

export function* authWatcherSaga() {
  console.log("Auth watcher saga started");
  yield all([
    takeLatest(authActions.login.type, loginSaga),
    takeLatest(authActions.logout.type, logoutSaga),
    takeLatest(authActions.register.type, registerSaga),
  ]);
}
