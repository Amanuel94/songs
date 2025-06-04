/** @jsxImportSource @emotion/react */

import { songFilterStyles } from "styles/dashboard";
import SongCard from "./songCard";
import { font } from "styles";
import { useEffect } from "react";
import { APIFetchStatus, SONG_API_ACTION_TYPE_STRINGS, SongData } from "@types";
import { UnknownAction } from "@reduxjs/toolkit";
import { songApiActions, SongApiState } from "features/songApiSlice";
import { useAppSelector, useAppDispatch } from "hooks/stateHooks";
import { pageNumberActions } from "features/pageSlice";
import { LIMIT } from "../constants";
import Loading from "./Loading";

const AllSongs = () => {
  const filterOn = [
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist" },
    { value: "album", label: "Album" },
    { value: "uploadedBy", label: "Uploder" },
    { value: "genre", label: "Genre" },
  ];

  const sortBy = [
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist Name" },
    { value: "album", label: "Album Name" },
    { value: "createdAt", label: "Created At" },
    { value: "updatedAt", label: "Last Modified" },
  ];

  const dispatch = useAppDispatch();
  const pageNumber = useAppSelector((state) => state.page);
  const songData: SongApiState<{ songs: SongData[]; pages: number }> =
    useAppSelector((state) => state.songsApi);

  let songs: SongData[] = []

  useEffect(() => {
    dispatch(pageNumberActions.setPage(1));
    dispatch(songApiActions.clear({}));
  }, []);

  useEffect(() => {
    const action: UnknownAction = {
      type: SONG_API_ACTION_TYPE_STRINGS.FetchAll,
      payload: {
        req: {
          page: pageNumber.value,
          limit: LIMIT,
        },
      },
    };
    console.log("Dispatching action:", action);
    dispatch(songApiActions.pending({}));
    dispatch(action);
  }, [pageNumber.value]);

  useEffect(() => {
    if (songData.status === APIFetchStatus.SUCCESS) {
      dispatch(songApiActions.reset({}));
    } else if (songData.status === APIFetchStatus.ERROR) {
      alert(`Error fetching songs: ${songData.error}`);
      dispatch(songApiActions.reset({}));
    }
  }, [songData.status]);

  songs = songData.data?.songs ? [...songData.data?.songs] : [];
  const numberOfPages = songData.data?.pages || 0;

 const fetchSongs = () => {
    dispatch(pageNumberActions.setPage(1));
    const queryParams = {
      query: document.querySelector("input[type='text']")
        ? (document.querySelector("input[type='text']") as HTMLInputElement)
            .value
        : "",
      on: (document.getElementById("filteron") as HTMLSelectElement | null)
        ?.value,
      sortBy: (document.getElementById("sortby") as HTMLSelectElement | null)
        ?.value,
      asc: (document.getElementById("sortorder") as HTMLSelectElement | null)
        ?.value,
      page: pageNumber.value,
      limit: LIMIT,
    };
    const action: UnknownAction = {
      type: SONG_API_ACTION_TYPE_STRINGS.FetchSearch,
      payload: {
        req: queryParams,
      },
    };
    console.log("Dispatching action:", action);
    dispatch(songApiActions.pending({}));
    dispatch(action);
  }

  return (
    <>
      {songData.status === APIFetchStatus.PENDING && <Loading />}
      <div>
        <h2> All Songs </h2>
        <div css={[songFilterStyles.self, font.lubrifont]}>
          <input css={songFilterStyles.input} type="text" />
          <div css={songFilterStyles.selectContainer}>
            <label htmlFor="filteron" css={songFilterStyles.selectLabel}>
              {" "}
              Filter On{" "}
            </label>
            <select css={songFilterStyles.select} name="filteron" id="filteron">
              <option value="" disabled selected>
                Filter On
              </option>
              {filterOn.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div css={songFilterStyles.selectContainer}>
            <label htmlFor="sortby" css={songFilterStyles.selectLabel}>
              {" "}
              Sort By{" "}
            </label>
            <select css={songFilterStyles.select} name="sortby" id="sortby">
              <option value="" disabled selected>
                Sort By
              </option>
              {sortBy.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div css={songFilterStyles.selectContainer}>
            <label htmlFor="sortorder" css={songFilterStyles.selectLabel}>
              {" "}
              Order{" "}
            </label>
            <select
              css={songFilterStyles.select}
              name="sortorder"
              id="sortorder"
            >
              <option value="t">Ascending</option>
              <option value="f">Descending</option>
            </select>
          </div>
          <button css={songFilterStyles.btn} onClick={fetchSongs}>
            Filter
          </button>
        </div>
        <div css={songFilterStyles.results}>
          {" "}
            {songs.length > 0
            ? `Showing results ${(pageNumber.value - 1) * LIMIT + 1} - ${(pageNumber.value - 1) * LIMIT + songs.length}`
            : "No results found"}
        </div>
        <div>
          {songs.map((song, index) => (
            <SongCard
              key={index}
              title={song.title}
              artist={song.artist}
              album={song.album}
              genre={song.genre}
              uploadedBy={
                typeof song.uploadedBy === "string"
                  ? song.uploadedBy
                  : song.uploadedBy.username
              }
              createdAt={song.createdAt}
              _id={song._id.toString()}
            />
          ))}
        </div>
        <div css={songFilterStyles.pagination}>
          <button
            css={songFilterStyles.pageBtn}
            onClick={() => {
              if (pageNumber.value > 1) {
                dispatch(pageNumberActions.decrement({}));
              }
            }}
            disabled={pageNumber <= 1}
          >
            &lt;
          </button>
          <span>
            Page {pageNumber.value} of {Math.max(numberOfPages, 1)}
          </span>
          <button
            css={songFilterStyles.pageBtn}
            onClick={() => {
              if (pageNumber.value < numberOfPages) {
                dispatch(pageNumberActions.increment({}));
              }
            }}
            disabled={pageNumber >= numberOfPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default AllSongs;
