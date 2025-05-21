import express from "express";
import checkBearerToken from "../middlewares/check-bearer-token";
import errorHandler from "../middlewares/error-handler";
import createSong from "../controllers/songs/create";
import {getSongs, getSongById} from "../controllers/songs/get";
import updateSong from "../controllers/songs/update";
import deleteSong from "../controllers/songs/delete";
import searchSongs from "../controllers/songs/search";
import getSongStat from "../controllers/songs/stat";

const router = express.Router();

// CRUD operations
router.post("/", [checkBearerToken], createSong, errorHandler);
router.get("/", [], getSongs, errorHandler);

router.get("/:id", [], getSongById, errorHandler);
router.put("/:id", [checkBearerToken], updateSong, errorHandler);
router.delete("/:id", [checkBearerToken], deleteSong, errorHandler);
router.post("/search", [], searchSongs, errorHandler);

// Stat
router.post("/stat", [], getSongStat, errorHandler); 


export default router;
