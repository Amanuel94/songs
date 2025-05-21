import { type Document, model, Schema } from "mongoose";
import { type SongStat } from "../@types";
import { time } from "console";

interface ISongStat extends Document, SongStat {}

const instance = new Schema<ISongStat>(
  {
    numberOfSongs: {
      type: Number,
      required: true,
    },
    numberOfUsers: {
      type: Number,
      required: true,
    },
    numberOfSongsByGenre: [
      {
        key: String,
        count: Number,
      },
    ],
    numberOfSongsByArtist: [
      {
        key: String,
        count: Number,
      },
    ],
    numberOfSongsByAlbum: [
      { 
        key: String,
        count: Number,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "SongStat";

export default model<ISongStat>(modelName, instance);
