import mongoose from "mongoose";
import SongModel from "../models/Song";
import SongStatModel from "../models/SongStat";
import AccountModel from "../models/Account";
import { updateSongStat } from "../utils/input"; // Adjust path as needed
import { faker } from "@faker-js/faker"; // For generating fake data
import { MONGO_URI } from "../constants";

// Configuration
const ARTISTS = [
  "The Weeknd",
  "Taylor Swift",
  "Kendrick Lamar",
  "Billie Eilish",
  "Drake",
  "BTS",
  "Adele",
  "Ed Sheeran",
];
const GENRES = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Country",
];
const ALBUMS = [
  "After Hours",
  "Midnights",
  "To Pimp a Butterfly",
  "Happier Than Ever",
  "Certified Lover Boy",
  "Map of the Soul: 7",
  "30",
  "Divide",
  "Random Access Memories",
  "Folklore",
];

// Function to generate random date between March 1, 2025 and June 5, 2025
const getRandomDate = () => {
  const start = new Date(2025, 2, 1); // March 1, 2025 (month is 0-indexed)
  const end = new Date(2025, 5, 5); // June 5, 2025
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getRandomIncrement = (l: number, r: number) => {
  // Generate a random increment between l and r
  return Math.floor(Math.random() * (r - l + 1)) + l;
};

// Function to generate 100 songs
const generateSongs = async (uploadedBy: mongoose.Types.ObjectId) => {
  const songs = [];
  let cur = new Date(2024, 5, 1);

  for (let i = 0; i < 150; i++) {
    const artist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];
    const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
    const album =
      Math.random() > 0.2
        ? ALBUMS[Math.floor(Math.random() * ALBUMS.length)]
        : null;

    const song = {
      title: faker.music.songName(),
      artist,
      album,
      genre,
      uploadedBy,
      createdAt: cur, // Increment by 1 to 3 days
    };

    let increment = getRandomIncrement(0, 6);
    cur = new Date(
      cur.getTime() + increment * 24 * 60 * 60 * 1000
    );

    // process.stdout.write("\r\x1b[K");
    // process.stdout.write(`${song.createdAt}, increment: ${increment}\n`);
    

    songs.push(song);
  }

  return songs;
};

// Seed function
const seedSongs = async () => {
  console.log("Seeding songs...");
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI as string);
    console.log("Connected to MongoDB");

    // Get or create an admin account to upload songs
    let adminAccount = await AccountModel.findOne({ username: "admin" });
    if (!adminAccount) {
      adminAccount = await AccountModel.create({
        username: "admin",
        password: "tempPassword", // In production, hash this
        role: "user",
      });
    }

    // Clear existing data
    await SongModel.deleteMany({});
    await SongStatModel.deleteMany({});
    console.log("Cleared existing songs and stats");

    // Generate and insert songs
    const songsToInsert = await generateSongs(adminAccount._id);
    const insertedSongs = await SongModel.insertMany(songsToInsert);
    console.log(`Inserted ${insertedSongs.length} songs`);

    // Update stats for each song
    insertedSongs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    let numberOfStatsProcessed = 0;
    for (const song of insertedSongs) {
      await updateSongStat(
        {
          genre: song.genre,
          artist: song.artist,
          album: song.album || null,
        },
        1,
        song.createdAt
      );
      process.stdout.write(`\r\x1b[KProcessed ${++numberOfStatsProcessed} of ${insertedSongs.length} songs`);
    }
    console.log("Updated song statistics");

    // Verify stats
    const totalStats = await SongStatModel.aggregate([
      {
        $group: {
          _id: null,
          totalSongs: { $sum: "$numberOfSongs" },
          totalDays: { $sum: 1 },
        },
      },
    ]);

    console.log(`Total songs in stats: ${totalStats[0]?.totalSongs || 0}`);
    console.log(`Stats tracked for ${totalStats[0]?.totalDays || 0} days`);

    // Disconnect
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding songs:", error);
    process.exit(1);
  }
};

// Run the seed
export default seedSongs;
