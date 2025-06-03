import { createSlice, Slice } from "@reduxjs/toolkit";

export interface SongState {
  dirty: boolean;
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const initialState: SongState = {
  dirty: false,
  id: "",
  title: "",
  artist: "",
  album: "",
  genre: "",
};
export const songSlice: Slice = createSlice({
  name: "updateSong",
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      state.dirty = true;
      state.title = action.payload.title;
      state.id = action.payload.id;
      state.artist = action.payload.artist;
      state.album = action.payload.album;
      state.genre = action.payload.genre;
    },
    reset: (state) => {
      state.dirty = false;
      state.id = "";
      state.title = "";
      state.artist = "";
      state.album = "";
      state.genre = "";
    },
  },
});

export const updateSongActions = songSlice.actions;
export const updateSongReducers = songSlice.reducer;
