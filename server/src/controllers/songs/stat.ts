import { type RequestHandler } from "express";
import SongStat from "../../models/SongStat";
import joi from "../../utils/joi";

const getSongStat: RequestHandler = async (req, res, next) => {
  try {
    const validationError = await joi.validate(
      {
        startDate: joi.instance.string().required(),
        endDate: joi.instance.string().required(),
      },
      req.body
    );

    if (validationError) {
      return next(validationError);
    }

    const { startDate, endDate } = req.body;

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return next({
        statusCode: 400,
        message: "Invalid date format",
      });
    }

    if (start > end) {
      return next({
        statusCode: 400,
        message: "Start date must be before end date",
      });
    }
    // Find songs in the date range
    const songStats = await SongStat.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(200).json({
      message: "Songs Statistics",
      total: songStats.length,
      data: songStats,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getSongStat;
