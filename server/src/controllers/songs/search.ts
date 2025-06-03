import { type RequestHandler } from "express";
import Song from "../../models/Song";
import Account from "../../models/Account";
import joi from "../../utils/joi";
import { ObjectId } from "mongodb";

const searchSongs: RequestHandler = async (req, res, next) => {
  try {
    const validOns = ["title", "artist", "genre", "uploadedBy"];
    const validSorts = ["title", "artist", "album", "createdAt", "updatedAt"];
    const validationError = await joi.validate(
      {
        q: joi.instance.string().required(),
        on: joi.instance
          .string()
          .valid(...validOns)
          .required(),
        sort: joi.instance
          .string()
          .valid(...validSorts)
          .required(),
        page: joi.instance.number().optional(),
        limit: joi.instance.number().optional(),
        asc: joi.instance.string().valid("t", "f").optional(),
      },
      req.query
    );

    if (validationError) {
      return next(validationError);
    }
    // Extract query parameters

    let { q, on, sort, page, limit, asc } = req.query;
    let qstr = q as string;
    let qobj;
    if (!page) {
      page = 1 + "";
    }

    if (!limit) {
      limit = 15 + "";
    }

    if (on === "uploadedBy") {
      const user = await Account.findOne({
        username: q,
      });

      if (!user) {
        return next({
          statusCode: 404,
          message: "User not found",
        });
      }
      qstr = user._id as string;
      qobj = new ObjectId(qstr);
    }

    const matchOptions =
      (on as string) === "uploadedBy"
        ? {
            [on as string]: {
              $eq: qobj,
            },
          }
        : {
            [on as string]: { $regex: qstr, $options: "i" },
          };

    const agg_pipeline = [
      {
        $match: { ...matchOptions },
      },
      {
        $sort: { [sort as string]: (asc === "t" ? 1 : -1) as 1 | -1 },
      },
      { $limit: limit ? parseInt(limit as string, 10) : 15 },
      {
        $skip: page
          ? (parseInt(page as string, 10) - 1) *
            (limit ? parseInt(limit as string, 10) : 15)
          : 0,
      },
    ];

    const songs = await Song.aggregate(agg_pipeline);
    if (!songs) {
      return next({
        statusCode: 404,
        total: 0,
        message: "No songs found",
      });
    }

    const songsWithUser = await Promise.all(
      songs.map(async (song) => {
        const user = await Account.findById(song.uploadedBy);
        if (!user) {
          return {
            ...song,
            uploadedBy: null,
          };
        }
        return {
          ...song,
          uploadedBy: {
            id: user._id,
            username: user.username,
          },
        };
      })
    );

    res.status(200).json({
      message: "Aggregated songs",
      total: songs.length,
      data: {
        songs: songsWithUser,
        page: 1,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default searchSongs;
