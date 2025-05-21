import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import Song from "../../models/Song";
import { sanitizeStringInput } from "../../utils/input";

const updateSong: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        title: joi.instance.string().required().min(3).max(20),
        artist: joi.instance.string().required().min(8).max(20),
        genre: joi.instance.string().required().min(3).max(20),
        album: joi.instance.string().optional(),
      },
      req.body
    );

    if (validationError) {
      console.log(validationError);
      return next(validationError);
    }
    const id = req.params.id;
    if (!id) {
      return next({
        statusCode: 400,
        message: "Missing song id",
      });
    }
    const { title, artist, album, genre } = req.body;
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

    const song = await Song.findByIdAndUpdate(
      id,
      {
        title: sanitizeStringInput(title),
        artist: sanitizeStringInput(artist),
        album: album ? sanitizeStringInput(album) : null,
        genre: sanitizeStringInput(genre),
        uploadedBy: req.auth?.uid,
      },
      { new: true }
    );
    if (!song) {
      return next({
        statusCode: 404,
        message: "Song not found",
      });
    }

    const { _id, ...data } = song.toObject();
    res.status(201).json({
      message: "Succesfully updated  song",
      data: {
        ...data,
        id: _id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default updateSong;
