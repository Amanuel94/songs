import { createSlice, Slice } from "@reduxjs/toolkit";

const indicatorSlice: Slice = createSlice({
  name: "indicator",
  initialState: 0,
  reducers: {
    toggle: (state) => {
      return state === 0 ? 1 : 0;
    },
  },
});

export const indicator = indicatorSlice.actions;
export const indicatorReducers = indicatorSlice.reducer;
