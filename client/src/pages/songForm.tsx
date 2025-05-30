/** @jsxImportSource @emotion/react */

import { ISongFormInput } from "@types";
import InputField from "components/InputField";
import { updateSongActions } from "features/songSlice";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { color, font } from "styles";
import { formStyles } from "styles/form";

const SongForm = () => {
  const { handleSubmit, control } = useForm<ISongFormInput>({
    mode: "onBlur",
  });

  const authState = useAppSelector((state) => state.auth);
  const songData = useAppSelector((state) => state.updateSong);
  const dispatch = useAppDispatch();

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

  const onSubmit: SubmitHandler<ISongFormInput> = (data: ISongFormInput) => {

    dispatch(updateSongActions.reset({})); 

  };

  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundImage: color.gradient,
        paddingTop: "2rem",
      }}
    >
      <div css={[formStyles.self, font.lubrifont, { height: "70vh" }]}>
        <h1> {songData.title ? "Update" : "Add"} Song </h1>
        <hr css={[formStyles.separator]} />
        <form css={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            type="text"
            name="title"
            value={songData.title}
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
            value={songData.artist}
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
            value={songData.album}
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
            value={songData.genre}
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
            value={songData.title ? "Update Song" : "Add Song"}
            css={[formStyles.btn, font.lubrifont, { width: "50%" }]}
          />
        </form>
      </div>
    </div>
  );
};

export default SongForm;
