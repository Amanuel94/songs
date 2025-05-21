import { type RequestHandler } from "express";
import Song from "../../models/Song";

const getSongs: RequestHandler = async (req, res, next) => {
  try {
    
    const songs = await Song.find({}).populate("uploadedBy", "-password").exec();
    if (!songs) {
        return next({
            statusCode: 404,
            total: 0,
            message: "No songs found",
        });
        }

    res.status(200).json({
        message: "Succesfully got songs",
        total: songs.length,
        data: songs,
    });

  } catch (error) {
    next(error);
  }
};

const getSongById: RequestHandler = async (req, res, next) => {
    try {  
        const { id } = req.params;
        const song = await Song.findById(id).populate("uploadedBy", "-password").exec();
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
        }
    catch (error) {
        next(error);
    }
}

export {getSongs, getSongById};
