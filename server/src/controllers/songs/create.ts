import { type RequestHandler } from "express";
import joi from "../../utils/joi";
import Song from "../../models/Song";
import { sanitizeStringInput } from "../../utils/input";

const createSong: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        title: joi.instance.string().required().min(3).max(20),
        artist: joi.instance.string().required().min(8).max(30),
        genre: joi.instance.string().required().min(3).max(20),
        album: joi.instance.string().optional(),
      },
      req.body
    );

    if (validationError) {
      console.log(validationError);
      return next(validationError);
    }

    const { title, artist, album, genre } = req.body;


    const song = new Song({
      title: sanitizeStringInput(title),
      artist: sanitizeStringInput(artist),
      album: album ? sanitizeStringInput(album) : null,
      genre: sanitizeStringInput(genre),
      uploadedBy:  req.auth?.uid,
    });

    await song.save();
    const { _id, ...data } = song.toObject();
    res.status(201).json({
      message: "Succesfully created song",
      data: {
        ...data,
        id: _id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default createSong;
