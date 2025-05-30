/** @jsxImportSource @emotion/react */

import { songFilterStyles } from "styles/dashboard";
import SongCard from "./songCard";
import { font } from "styles";

const allSongs = () => {
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

  const songs = [
    {
      id: 1,
      title: "Song One",
      artist: "Artist A",
      album: "Album X",
      genre: "Pop",
      uploadedBy: "User1",
      createdAt: "2024-06-01T10:15:00",
      updatedAt: "2024-06-05T14:30:00",
    },
    {
      id: 2,
      title: "Song Two",
      artist: "Artist B",
      album: "Album Y",
      genre: "Rock",
      uploadedBy: "User2",
      createdAt: "2024-05-15T09:00:00",
      updatedAt: "2024-06-03T16:45:00",
    },
    {
      id: 3,
      title: "Song Three",
      artist: "Artist A",
      album: "Album Z",
      genre: "Jazz",
      uploadedBy: "User3",
      createdAt: "2024-04-20T13:20:00",
      updatedAt: "2024-05-22T11:10:00",
    },
    {
      id: 4,
      title: "Song Four",
      artist: "Artist C",
      album: "Album X",
      genre: "Hip-Hop",
      uploadedBy: "User4",
      createdAt: "2024-03-10T08:40:00",
      updatedAt: "2024-04-01T17:25:00",
    },
    {
      id: 5,
      title: "Song Five",
      artist: "Artist D",
      album: "Album Y",
      genre: "Classical",
      uploadedBy: "User5",
      createdAt: "2024-02-18T19:55:00",
      updatedAt: "2024-03-20T21:00:00",
    },
    {
      id: 6,
      title: "Song Six",
      artist: "Artist E",
      album: "Album W",
      genre: "Electronic",
      uploadedBy: "User1",
      createdAt: "2024-01-25T07:30:00",
      updatedAt: "2024-02-15T12:15:00",
    },
    {
      id: 7,
      title: "Song Seven",
      artist: "Artist F",
      album: "Album V",
      genre: "Country",
      uploadedBy: "User2",
      createdAt: "2023-12-30T15:10:00",
      updatedAt: "2024-01-10T18:20:00",
    },
    {
      id: 8,
      title: "Song Eight",
      artist: "Artist G",
      album: "Album U",
      genre: "Reggae",
      uploadedBy: "User3",
      createdAt: "2023-11-12T22:05:00",
      updatedAt: "2023-12-01T23:30:00",
    },
    {
      id: 9,
      title: "Song Nine",
      artist: "Artist H",
      album: "Album T",
      genre: "Blues",
      uploadedBy: "User4",
      createdAt: "2023-10-05T06:45:00",
      updatedAt: "2023-11-10T10:50:00",
    },
    {
      id: 10,
      title: "Song Ten",
      artist: "Artist I",
      album: "Album S",
      genre: "Folk",
      uploadedBy: "User5",
      createdAt: "2023-09-15T20:00:00",
      updatedAt: "2023-10-01T21:15:00",
    },
  ];

  const fetchSongs = () => {
    console.log({
        filterOn: (document.getElementById("filteron") as HTMLSelectElement | null)?.value,
        sortBy: (document.getElementById("sortby") as HTMLSelectElement | null)?.value,
        sortOrder: (document.getElementById("sortorder") as HTMLSelectElement | null)?.value,
        searchQuery: (document.querySelector("input[type='text']") as HTMLInputElement | null)?.value,
    })
  }

  return (
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
          <select css={songFilterStyles.select} name="sortorder" id="sortorder">
            <option value="t">Ascending</option>
            <option value="f">Descending</option>
          </select>
        </div>
        <button css={songFilterStyles.btn} onClick={fetchSongs}>Filter</button>
      </div>
      <div css={songFilterStyles.results}>
        {" "}
        Showing 1- 10 out of 50 results{" "}
      </div>
      <div>
        {songs.map((song, index) => (
          <SongCard
            key={index}
            title={song.title}
            artist={song.artist}
            album={song.album}
            genre={song.genre}
            uploadedBy={song.uploadedBy}
            createdAt={song.createdAt}
            _id={song.id.toString()}
          />
        ))}
      </div>
      <div css={songFilterStyles.pagination}>
        <button css={songFilterStyles.pageBtn}>&lt;</button>
        <span>Page 1 of 5</span>
        <button css={songFilterStyles.pageBtn}>&gt;</button>
      </div>
    </div>
  );
};

export default allSongs;
