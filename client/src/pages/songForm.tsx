/** @jsxImportSource @emotion/react */

import { UnknownAction } from "@reduxjs/toolkit";
import {
  APIFetchStatus,
  ISongFormInput,
  SONG_API_ACTION_TYPE_STRINGS,
  SongData,
} from "@types";
import { client } from "api/axios";
import InputField from "components/InputField";
import Loading from "components/Loading";
import { songApiActions, SongApiState } from "features/songApiSlice";
import { updateSongActions } from "features/updateSlice";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { color, font } from "styles";
import { formStyles } from "styles/form";

const SongForm = () => {
  const { handleSubmit, control } = useForm<ISongFormInput>({
    mode: "onBlur",
  });

  const authState = useAppSelector((state) => state.auth);
  const songData = useAppSelector((state) => state.updateSong);
  const songApiStatus: SongApiState<SongData[]> = useAppSelector(
    (state) => state.songsApi
  );

  const songDataRef = useRef(songData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (songApiStatus.status === APIFetchStatus.SUCCESS) {
      alert("Song Created Successfully");
      dispatch(songApiActions.reset({}));
      navigate("/dashboard");
    } else if (songApiStatus.status === APIFetchStatus.ERROR) {
      alert(`Song could not be created: ${songApiStatus.error}`);
      dispatch(songApiActions.reset({}));
    }
  }, [songApiStatus.status]);

  if (!authState.isAuthenticated) {
    return (
      <div
        css={{
          width: "100%",
          height: "100vh",
          backgroundImage: color.gradient,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 css={[font.lubrifont, { color: "white" }]}>
          Please log in to add or update songs.
        </h1>
      </div>
    );
  }

  try {
    client.setAuthToken(authState.accessToken);
  } catch (error) {
    console.error("Error setting auth token:", error);
    alert("Failed to set authentication token.");
    return null;
  }
  const songDataCp = songDataRef.current;
  const onSubmit: SubmitHandler<ISongFormInput> = (data: ISongFormInput) => {
    const action: UnknownAction = {
      type: songDataCp.dirty
        ? SONG_API_ACTION_TYPE_STRINGS.Update
        : SONG_API_ACTION_TYPE_STRINGS.Create,
      payload: {
        req: {
          ...data,
          id: songDataCp.dirty ? songDataCp.id : undefined,
        },
      },
    };
    dispatch(songApiActions.pending({}));
    dispatch(action);
  }
    dispatch(updateSongActions.reset({}));
    return (
      <>
        {songApiStatus.status === APIFetchStatus.PENDING && <Loading />}
        <div
          css={{
            width: "100%",
            height: "100vh",
            backgroundImage: color.gradient,
            paddingTop: "2rem",
          }}
        >
          <div css={[formStyles.self, font.lubrifont, { height: "70vh" }]}>
            <h1> {songDataCp.title ? "Update" : "Add"} Song </h1>
            <hr css={[formStyles.separator]} />
            <form css={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label="Title"
                type="text"
                name="title"
                value={songDataCp.title}
                defaultValue={songDataCp.title}
                control={control}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Title must not exceed 20 characters",
                  },
                }}
                placeholder="Song Title"
                required={true}
              />
              <InputField
                label="Artist Name"
                type="text"
                name="artist"
                control={control}
                value={songDataCp.artist}
                defaultValue={songDataCp.artist}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Artist name must be at least 3 characters long",
                  },
                }}
                placeholder="Song Artist"
                required={true}
              />

              <InputField
                label="Album Name"
                type="text"
                name="album"
                control={control}
                value={songDataCp.album}
                defaultValue={songDataCp.album}
                rules={{
                  minLength: {
                    value: 3,
                    message: "Album name must be at least 3 characters long",
                  },
                }}
                placeholder="Song Album"
              />

              <InputField
                label="Genre"
                type="text"
                name="genre"
                control={control}
                value={songDataCp.genre}
                defaultValue={songDataCp.genre}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "Genre name must be at least 3 characters long",
                  },
                }}
                placeholder="Song Genre"
                required={true}
              />

              <input
                type="submit"
                value={songDataCp.dirty ? "Update Song" : "Add Song"}
                css={[formStyles.btn, font.lubrifont, { width: "50%" }]}
              />
            </form>
          </div>
        </div>
      </>
    );
  }

export default SongForm;