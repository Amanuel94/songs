import { createSlice, Slice } from "@reduxjs/toolkit";
import { APIFetchStatus, SongStat } from "@types";

export interface SongStatApiState {
  status: APIFetchStatus;
  error: string | null;
  data: SongStat[] | undefined;
}

const initialState: SongStatApiState = {
  status: APIFetchStatus.IDLE,
  error: null,
  data: undefined,
};
export const songStatSlice: Slice = createSlice({
  name: "songsStatApi",
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
      state.error = null;
    },
    clear: (state) => {
      state.status = APIFetchStatus.IDLE;
      state.data = undefined;
      state.error = null;
    }
  },
});

export const songStatApiActions = songStatSlice.actions;
export const songStatApiReducers = songStatSlice.reducer;
