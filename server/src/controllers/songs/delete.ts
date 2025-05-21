import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import Song from "../../models/Song";
import {
  sanitizeStringInput,
  updateKeyValueAsync,
  updateSongStat,
} from "../../utils/input";
import SongStat from "../../models/SongStat";

const deleteSong: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next({
        statusCode: 400,
        message: "Missing song id",
      });
    }
    const oldSong = await Song.findById(id);
    if (!oldSong) {
      return next({
        statusCode: 404,
        message: "Song not found",
      });
    }

    // Check if the user is the owner of the song
    if (oldSong.uploadedBy.toString() !== req.auth?.uid) {
      return next({
        statusCode: 403,
        message: "You are not authorized to update this song",
      });
    }

    const song = await Song.findByIdAndDelete(id);
    if (!song) {
      return next({
        statusCode: 404,
        message: "Song not found",
      });
    }

    // make incremental update to song stat
    await updateSongStat(song, -1);

    const { _id, ...data } = song.toObject();
    res.status(201).json({
      message: "Succesfully removed song",
      data: {
        ...data,
        id: _id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default deleteSong;
