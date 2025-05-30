import { createSlice, Slice } from "@reduxjs/toolkit";
import { APIFetchStatus } from "@types";

export interface AuthState {
  status: APIFetchStatus;
  isAuthenticated: boolean;
  error: string | null;
  user: {
    id: string;
    username: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  status: APIFetchStatus.IDLE,
  isAuthenticated: false,
  error: null,
  user: {
    id: "",
    username: "",
  },
  accessToken: undefined,
  refreshToken: undefined,
};

export const authSlice: Slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAllstate: (state) => {
      state.status = APIFetchStatus.IDLE;
      state.isAuthenticated = false;
      state.error = null;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = { ...initialState.user };
    },
    login: (state) => {
      state.status = APIFetchStatus.PENDING;
    },
    register: (state) => {
      state.status = APIFetchStatus.PENDING;
    },
    loginSuccess: (state, action) => {
      state.status = APIFetchStatus.SUCCESS;
      state.isAuthenticated = true;
      state.user.id = action.payload.data._id;
      state.error = null;
      state.user.username = action.payload.data.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    loginFailure: (state, action) => {
      state.status = APIFetchStatus.ERROR;
      state.isAuthenticated = false;
      state.user.id = "";
      state.error = action.payload.message || "Login failed";
      state.user.username = "";
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    logout: (state) => {
      state.status = APIFetchStatus.IDLE;
      state.isAuthenticated = false;
      state.user.id = "";
      state.error = null;
      state.user.username = "";
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
    reset: (state) => {
      state.status = APIFetchStatus.IDLE;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducers = authSlice.reducer;
