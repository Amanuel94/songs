import { SongStat } from "../@types";

const genres = ["Pop", "Rock", "Jazz", "Hip-Hop"];
const artists = ["Artist A", "Artist B", "Artist C"];
const albums = ["Album X", "Album Y", "Album Z"];

function randomIncrement(base: number, min: number, max: number) {
    return base + Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDummySongStatData(): SongStat[] {
    const startDate = new Date("2025-01-01");
    const endDate = new Date("2025-05-31");
    const data: SongStat[] = [];

    let totalSongs = 100;
    let genreCounts = genres.map(() => 25);
    let artistCounts = artists.map(() => 33);
    artistCounts[0] += 1;
    let albumCounts = albums.map(() => 20);
    let albumsByArtist = artists.map(() => 20);
    let albumsByGenre = genres.map(() => 15);

    for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
    ) {
        // Slightly increase counts, but not strictly
        let diff = randomIncrement(totalSongs, 0, 3) - totalSongs
        totalSongs = totalSongs + diff;
        // Add diff to a random element in each array for consistency
        const genreIdx = Math.floor(Math.random() * genreCounts.length);
        const artistIdx = Math.floor(Math.random() * artistCounts.length);
        const albumIdx = Math.floor(Math.random() * albumCounts.length);
        const albumsByArtistIdx = Math.floor(Math.random() * albumsByArtist.length);
        const albumsByGenreIdx = Math.floor(Math.random() * albumsByGenre.length);

        genreCounts = genreCounts.map((c, i) => i === genreIdx ? c + diff : c);
        artistCounts = artistCounts.map((c, i) => i === artistIdx ? c + diff : c);
        albumCounts = albumCounts.map((c, i) => i === albumIdx ? c + diff : c);
        albumsByArtist = albumsByArtist.map((c, i) => i === albumsByArtistIdx ? c + diff : c);
        albumsByGenre = albumsByGenre.map((c, i) => i === albumsByGenreIdx ? c + diff : c);

        data.push({
            numberOfSongs: totalSongs,
            numberOfSongsByGenre: genres.map((key, i) => ({
                key,
                count: genreCounts[i],
            })),
            numberOfSongsByArtist: artists.map((key, i) => ({
                key,
                count: artistCounts[i],
            })),
            numberOfSongsByAlbum: albums.map((key, i) => ({
                key,
                count: albumCounts[i],
            })),
            numberOfAlbumsByArtist: artists.map((key, i) => ({
                key,
                count: albumsByArtist[i],
            })),
            numberOfAlbumsByGenre: genres.map((key, i) => ({
                key,
                count: albumsByGenre[i],
            })),
            date: new Date(d),
        });
    }

    return data;
}

export const dummySongStatData: SongStat[] = generateDummySongStatData();