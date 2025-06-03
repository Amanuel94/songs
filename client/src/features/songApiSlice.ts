import { createSlice, Slice } from "@reduxjs/toolkit";
import { APIFetchStatus } from "@types";

export interface SongApiState<T> {
  status: APIFetchStatus;
  error: string | null;
  data: T | undefined;
}

const initialState: SongApiState<any> = {
  status: APIFetchStatus.IDLE,
  error: null,
  data: undefined,
};
export const songSlice: Slice = createSlice({
  name: "songsApi",
  initialState: initialState,
  reducers: {
    success: (state, action) => {
      state.status = APIFetchStatus.SUCCESS;
      state.data = action.payload.data;
      state.error = null;
    },
    pending: (state) => {
      state.status = APIFetchStatus.PENDING;
    },
    error: (state, action) => {
      state.status = APIFetchStatus.ERROR;
      state.error = action.payload.message || "An error occurred";
    },
    reset: (state) => {
      state.status = APIFetchStatus.IDLE;
      console.log("Resetting songApi state");
      state.error = null;
    },
  },
});

export const songApiActions = songSlice.actions;
export const songApiReducers = songSlice.reducer;
