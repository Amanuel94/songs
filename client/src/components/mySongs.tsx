/** @jsxImportSource @emotion/react */

import { SongData } from "@types";
import SongCard from "./songCard";
import { songCardStyles } from "styles/dashboard";
import { useAppDispatch, useAppSelector } from "hooks/stateHooks";
import { Link, useNavigate } from "react-router-dom";
import { updateSongActions } from "features/songSlice";

const MySongs = () => {
  const example: SongData[] = [
    {
      _id: "1",
      title: "Song One",
      artist: "Artist A",
      album: "Album Alpha",
      genre: "Pop",
      uploadedBy: "User1",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      _id: "2",
      title: "Song Two",
      artist: "Artist B",
      album: "Album Beta",
      genre: "Rock",
      uploadedBy: "User1",
      createdAt: "2023-10-02T12:00:00Z",
    },
    {
      _id: "3",
      title: "Song Three",
      artist: "Artist C",
      album: "Album Gamma",
      genre: "Jazz",
      uploadedBy: "User1",
      createdAt: "2023-10-03T12:00:00Z",
    },
  ];

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const editButtonClicked = (index:number) => {
    dispatch(updateSongActions.update({
      title: example[index].title,
      artist: example[index].artist,
      album: example[index].album,
      genre: example[index].genre,
      id: example[index]._id
    }))
    navigate("/add-song");
  }


  return (
    <div>
      <h1>
        {" "}
        My Songs{" "}
        <Link to="/add-song">
          <button css={[songCardStyles.btn, { fontSize: "1.5rem" }]}> +</button>{" "}
        </Link>
      </h1>
      <div>
        {authState.isAuthenticated &&
          example.map((song, index) => (
            <div style={{ display: "flex", alignItems: "center" }} key={index}>
              <SongCard
                key={index}
                title={song.title}
                artist={song.artist}
                album={song.album}
                genre={song.genre}
                uploadedBy={song.uploadedBy}
                createdAt={song.createdAt}
                _id={song._id}
              />
              <div css={songCardStyles.btns}>
                <button key={index + "e"} css={songCardStyles.btn} onClick={() => editButtonClicked(index)}>
                  {" "}
                  <img src="editb.svg" alt="" />{" "}
                </button>
                <button key={index + "d"} css={songCardStyles.btn}>
                  <img src="deleteb.svg" alt="" />{" "}
                </button>
              </div>
            </div>
          ))}
      </div>
      {!authState.isAuthenticated && <p>You need to register your add songs</p>}
    </div>
  );
};

export default MySongs;
