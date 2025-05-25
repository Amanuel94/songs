/** @jsxImportSource @emotion/react */

import { SongData } from "@types";
import SongCard from "./songCard";
import { songCardStyles } from "styles/dashboard";

const MySongs = () => {
  const example: SongData[] = [
    {
      title: "Song One",
      artist: "Artist A",
      album: "Album Alpha",
      genre: "Pop",
      uploadedBy: "User1",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      title: "Song Two",
      artist: "Artist B",
      album: "Album Beta",
      genre: "Rock",
      uploadedBy: "User1",
      createdAt: "2023-10-02T12:00:00Z",
    },
    {
      title: "Song Three",
      artist: "Artist C",
      album: "Album Gamma",
      genre: "Jazz",
      uploadedBy: "User1",
      createdAt: "2023-10-03T12:00:00Z",
    },
  ];

  return (
    <div>
      <h1> My Songs </h1>
      <div>
        {example.map((song, index) => (
          <div style={{ display: "flex", alignItems: "center"}} key={index}>
            <SongCard
              key={index}
              title={song.title}
              artist={song.artist}
              album={song.album}
              genre={song.genre}
              uploadedBy={song.uploadedBy}
              createdAt={song.createdAt}
            />
            <div css={songCardStyles.btns}>
              <button key={index + "e"} css={songCardStyles.btn}>
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
    </div>
  );
};

export default MySongs;
