import {
  DeleteSongActionType,
  DeleteSongResponse,
  FetchMySongsActionType,
  FetchMySongsResponse,
  FetchSongActionType,
  FetchSongResponse,
  FetchSongsActionType,
  FetchSongsResponse,
  SONG_API_ACTION_TYPE_STRINGS,
  UpsertSongActionType,
  UpsertSongResponse,
} from "@types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createSong,
  deleteSong,
  getSongById,
  mySongs,
  searchSongs,
  updateSong,
} from "../api/songApi";
import { songApiActions } from "features/songApiSlice";
import { indicator } from "features/indicator";
import {allSongs} from "../api/songApi";

function* createSongSaga(action: UpsertSongActionType) {
  console.log("Creating song with request:", action.payload.req);
  try {
    const response: UpsertSongResponse = yield call(
      createSong,
      action.payload.req
    );
    if (response.status === 201) {
      yield put(songApiActions.success({}));
    } else {
      yield put(
        songApiActions.error(response.data)
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to create song";
    console.error("Create song failed:", errorMessage);
    yield put(
      songApiActions.error({
        error: errorMessage,
      })
    );
  }
}

function* updateSongSaga(action: UpsertSongActionType) {
  try {
    const response: UpsertSongResponse = yield call(
      (req) => updateSong(req) as Promise<UpsertSongResponse>,
      action.payload.req
    );
    if (response.status === 200 || response.status === 201) {
      yield put(songApiActions.success({}));
    } else {
      yield put(
        songApiActions.error({
          error: response.message || "Failed to update song",
        })
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to update song";
    songApiActions.error({
      error:errorMessage
    })
  }
}

function* deleteSongSaga(action: DeleteSongActionType) {
  try {
    const response: DeleteSongResponse = yield call(
      (id) => deleteSong(id),
      action.payload.req.id
    );
    console.log("Delete song response:", response);
    if (response.status === 200) {
      yield put(songApiActions.success({}));
      yield put(indicator.toggle({}))
    } else {
      yield put(
        songApiActions.error({
          error: response.message || "Failed to delete song",
        })
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to delete song";
    console.error("Delete song failed:", errorMessage);
  }
}

function* getSongByIdSaga(action: FetchSongActionType) {
  try {
    const response: FetchSongResponse = yield call(
      (id) => getSongById(id),
      action.payload.id
    );
    if (response.status === 200) {
      yield put(songApiActions.success(response.data));
    } else {
      yield put(
        songApiActions.error({
          error: response.message || "Failed to fetch song",
        })
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to fetch song";
    console.error("Fetch song by ID failed:", errorMessage);
    yield put(songApiActions.error({ error: errorMessage }));
  }
}

function* searchSongsSaga(action: FetchSongsActionType) {
  try {
    const response: FetchSongsResponse = yield call(
      (req) => searchSongs(req) as Promise<FetchSongsResponse>,
      action.payload.req
    );
    if (response.status === 200) {
      yield put(songApiActions.success(response.data));
    } else {
      console.log("Search songs response:", response);
      yield put(
        songApiActions.error(response.data)
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to search songs";
    console.error("Search songs failed:", errorMessage);
  }
}

function* getSongs(action: FetchSongsActionType) {
  try {
    const response: FetchSongsResponse = yield call(
      (req) => allSongs(req.page, req.limit),
      action.payload.req
    );
    if (response.status === 200) {
      yield put(songApiActions.success(response.data));
    } else {
      console.error("Fetch songs failed:", response.message);
      yield put(
        songApiActions.error({
          error: response.message || "Failed to fetch songs",
        })
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to fetch songs";
    console.error("Fetch songs failed:", errorMessage);
    yield put(songApiActions.error({ error: errorMessage }));
  }
}

function* getMySongs(action: FetchMySongsActionType) {
  try {
    const response: FetchMySongsResponse = yield call(
      mySongs,
      action.payload.req.page,
      action.payload.req.limit
    );
    if (response.status === 200 || response.status === 201) {
      yield put(songApiActions.success(response.data));
    } else {
      yield put(
        songApiActions.error({
          error: response.message || "Failed to fetch my songs",
        })
      );
    }
  } catch (error) {
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : "Failed to fetch my songs";
    console.error("Fetch my songs failed:", errorMessage);
    yield put(songApiActions.error({ error: errorMessage }));
  }
}

export function* songWatcherSaga() {
  console.log("songSaga running");
  yield all([
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.Create, createSongSaga),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.Update, updateSongSaga),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.Delete, deleteSongSaga),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.Fetch, getSongByIdSaga),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.FetchSearch, searchSongsSaga),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.FetchMySongs, getMySongs),
    takeLatest(SONG_API_ACTION_TYPE_STRINGS.FetchAll, getSongs),
  ]);
}
