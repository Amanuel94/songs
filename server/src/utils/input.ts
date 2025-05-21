import SongStat from "../models/SongStat";
import Song from "../models/Song";

export const sanitizeStringInput = (input: string): string => {
  // Remove leading and trailing whitespace
  let sanitizedInput = input.trim();

  // Remove any HTML tags
  sanitizedInput = sanitizedInput.replace(/<\/?[^>]+(>|$)/g, "");

  // Remove any special characters (except for spaces)
  sanitizedInput = sanitizedInput.replace(/[^\w\s]/gi, "");

  // Limit the length to a maximum of 255 characters
  if (sanitizedInput.length > 255) {
    sanitizedInput = sanitizedInput.substring(0, 255);
  }

  // convert to lowercase
  sanitizedInput = sanitizedInput.toLowerCase();

  return sanitizedInput;
};

export const updateKeyValueAsync = async (
  cont: { key: string; count: number }[],
  k: string,
  v: number
) => {
  // Check if the key already exists in the array
  const existingKeyValue = cont.find((item) => item.key === k);
  if (existingKeyValue) {
    existingKeyValue.count += v;
    existingKeyValue.count = Math.max(0, existingKeyValue.count);
  } else {
    cont.push({ key: k, count: v });
  }
};

// Function to update the song stat
export const updateSongStat = async (
  song: { genre: string; artist: string; album: string | null },
  v: number
) => {
  // update the song stat for today
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let songStat = await SongStat.findOne({
    createdAt: {
      $gte: date,
      $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
    },
  });

  if (!songStat) {
    const lastDayStat = await SongStat.findOne({
      createdAt: {
        $lt: date,
        $gte: new Date(date.getTime() - 24 * 60 * 60 * 1000),
      },
    });

    // if no stat exists for today, create a new one
    songStat = new SongStat({
      numberOfSongs: lastDayStat ? lastDayStat.numberOfSongs : 0,
      numberOfSongsByGenre: lastDayStat ? lastDayStat.numberOfSongsByGenre : {},
      numberOfSongsByArtist: lastDayStat
        ? lastDayStat.numberOfSongsByArtist
        : {},
      numberOfSongsByAlbum: lastDayStat ? lastDayStat.numberOfSongsByAlbum : {},
      numberOfAlbumsByArtist: lastDayStat
        ? lastDayStat.numberOfAlbumsByArtist
        : {},
      numberOfAlbumsByGenre: lastDayStat
        ? lastDayStat.numberOfAlbumsByGenre
        : {},
      date: date,
    });
  }

  // update the song stat
  songStat.numberOfSongs += v;
  await updateKeyValueAsync(songStat.numberOfSongsByGenre, song.genre, v);
  await updateKeyValueAsync(songStat.numberOfSongsByArtist, song.artist, v);

  if (song.album) {
    await updateKeyValueAsync(songStat.numberOfSongsByAlbum, song.album, v);
    await updateKeyValueAsync(songStat.numberOfAlbumsByArtist, song.artist, v);
    await updateKeyValueAsync(songStat.numberOfAlbumsByGenre, song.genre, v);
  }
  await songStat.save();
  return songStat;
};
