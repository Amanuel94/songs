/** @jsxImportSource @emotion/react */

import { APIFetchStatus, SONG_API_ACTION_TYPE_STRINGS, SongData } from "@types";
import SongCard from "./songCard";
import { songCardStyles, songFilterStyles } from "styles/dashboard";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { Link, useNavigate } from "react-router-dom";
import { updateSongActions } from "features/updateSlice";
import { UnknownAction } from "redux-saga";
import { LIMIT } from "../constants";
import { pageNumberActions } from "features/pageSlice";
import { useEffect, useState } from "react";
import { songApiActions, SongApiState } from "features/songApiSlice";
import Loading from "./Loading";

const MySongs = () => {
  const pageNumber = useAppSelector((state) => state.page);
  const authState = useAppSelector((state) => state.auth);
  const indicator = useAppSelector((state) => state.indicator);
  const [render, setReneder] = useState(1);
  const songData: SongApiState<{
    songs: SongData[];
    pages: number;
  }> = useAppSelector((state) => state.songsApi);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("Song Data", songData);
  let songs: SongData[] = [];

  useEffect(() => {
    const action: UnknownAction = {
      type: SONG_API_ACTION_TYPE_STRINGS.FetchMySongs,
      payload: {
        req: {
          page: pageNumber.value,
          limit: LIMIT,
        },
      },
    };
    dispatch(songApiActions.pending({}));
    dispatch(action);
  }, [pageNumber.value, indicator]);

  if (
    songData.status === APIFetchStatus.SUCCESS ||
    songData.status === APIFetchStatus.ERROR
  ) {
    setReneder((prev) => prev + 1);
  }

  useEffect(() => {
    if (songData.status === APIFetchStatus.SUCCESS) {
      dispatch(songApiActions.reset({}));
    } else if (songData.status === APIFetchStatus.ERROR) {
      alert(`Error fetching songs: ${songData.error}`);
      dispatch(songApiActions.reset({}));
    }
  }, [render]);

  dispatch(songApiActions.reset({}));
  songs = songData.data?.songs ? [...songData.data.songs] : [];
  const totalPages = songData.data?.pages || 0;
  const editButtonClicked = (index: number) => {
    dispatch(
      updateSongActions.update({
        title: songs[index].title,
        artist: songs[index].artist,
        album: songs[index].album,
        genre: songs[index].genre,
        id: songs[index]._id,
      })
    );
    navigate("/add-song");
  };
  return (
    <>
      {songData.status === APIFetchStatus.PENDING && <Loading />}
      <div>
        <h1>
          {" "}
          My Songs{" "}
          <Link to="/add-song">
            <button css={[songCardStyles.btn, { fontSize: "1.5rem" }]}>
              {" "}
              +
            </button>{" "}
          </Link>
        </h1>

        {authState.isAuthenticated && (
          <div>
            {songs.map((song, index) => (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={index}
              >
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
                  _id={song._id}
                />
                <div css={songCardStyles.btns}>
                  <button
                    key={index + "e"}
                    css={songCardStyles.btn}
                    onClick={() => editButtonClicked(index)}
                  >
                    {" "}
                    <img src="editb.svg" alt="" />{" "}
                  </button>
                  <button
                    key={index + "d"}
                    css={songCardStyles.btn}
                    onClick={() => {
                      const action: UnknownAction = {
                        type: SONG_API_ACTION_TYPE_STRINGS.Delete,
                        payload: {
                          req: {
                            id: song._id,
                          },
                        },
                      };
                      dispatch(songApiActions.pending({}));
                      dispatch(action);
                    }}
                  >
                    <img src="deleteb.svg" alt="" />{" "}
                  </button>
                </div>
              </div>
            ))}
            <div css={songFilterStyles.pagination}>
              {totalPages > 0 ? (
                <>
                  <button
                    css={songFilterStyles.pageBtn}
                    onClick={() => {
                      if (pageNumber.value > 1) {
                        dispatch(pageNumberActions.decrement({}));
                      }
                    }}
                    disabled={pageNumber.value === 1}
                  >
                    &lt;
                  </button>
                  <span>
                    Page {pageNumber.value} of {totalPages}{" "}
                  </span>
                  <button
                    css={songFilterStyles.pageBtn}
                    onClick={() => {
                      if (pageNumber.value < totalPages) {
                        dispatch(pageNumberActions.increment({}));
                      }
                    }}
                    disabled={pageNumber.value === totalPages}
                  >
                    &gt;
                  </button>
                </>
              ) : (
                <span>You don't have any songs yet. </span>
              )}
            </div>
          </div>
        )}
        {!authState.isAuthenticated && (
          <p>You need to register your add songs</p>
        )}
      </div>
    </>
  );
};

export default MySongs;
