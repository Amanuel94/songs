import { all, call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "../features/authSlice";
import { loginUser, registerUser } from "../api/api";
import { AuthActionType, AuthResponse } from "@types";

function* loginSaga(action: AuthActionType) {
  try {
    const { username, password } = action.payload.req;
    const response: AuthResponse = yield call(loginUser, username, password);
    if (response.status === 200) {
      yield put(authActions.loginSuccess(response.data));
    } else {
      yield put(authActions.loginFailure(response.data));
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
  try {
    yield put(authActions.logout({}));
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Logout failed";
    yield put(authActions.loginFailure({ message: errorMessage }));
  }
}

function* registerSaga(action: AuthActionType) {
  try {
    const { username, password } = action.payload.req;
    const response: AuthResponse = yield call(registerUser, username, password);
    console.log("Register response:", response);
    if (response.status === 201) {
      yield put(authActions.loginSuccess(response.data));
    } else {
      yield put(authActions.loginFailure(response.data));
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
  yield all([
    takeLatest(authActions.login.type, loginSaga),
    takeLatest(authActions.logout.type, logoutSaga),
    takeLatest(authActions.register.type, registerSaga),
  ]);
}
