import { type RequestHandler } from "express";
import Song from "../../models/Song";
import { number } from "joi";

const getSongs: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (page < 1 || limit < 1) {
      return next({
        statusCode: 400,
        message: "Page and limit must be greater than 0",
      });
    }

    const songs = await Song.find({})
      .populate("uploadedBy", "-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (!songs) {
      return next({
        statusCode: 404,
        total: 0,
        message: "No songs found",
      });
    }
    const numberOfSongs = await Song.countDocuments({}).exec();
    const numberOfPages = Math.ceil(numberOfSongs / limit);

    res.status(200).json({
      message: "Succesfully got songs",
      total: songs.length,
      data: {
        songs: songs,
        pages: numberOfPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSongById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id)
      .populate("uploadedBy", "-password")
      .exec();
    if (!song) {
      return next({
        statusCode: 404,
        message: "Song not found",
      });
    }
    res.status(200).json({
      message: "Succesfully got song",
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

const mySongs: RequestHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    if (page < 1 || limit < 1) {
      return next({
        statusCode: 400,
        message: "Page and limit must be greater than 0",
      });
    }

    const userId = req.auth?.uid;
    if (!userId) {
      return next({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const skip = (page - 1) * limit;
    const songs = await Song.find({ uploadedBy: userId })
      .populate("uploadedBy", "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

      .exec();

    const numberOfSongs = await Song.find({ uploadedBy: userId })
      .countDocuments({})
      .exec();
    const numberOfPages = Math.ceil(numberOfSongs / limit);

    if (!songs) {
      return next({
        statusCode: 404,
        total: 0,
        message: "No songs found for this user",
      });
    }

    res.status(200).json({
      message: "Succesfully got user's songs",
      total: songs.length,
      data: {
        songs: songs,
        pages: numberOfPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getSongs, getSongById, mySongs };
