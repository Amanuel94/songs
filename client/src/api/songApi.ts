import { ISongFormInput, SearchQuery } from "@types";
import { instance } from "./axios";
import { r } from "utils/utils";

const createSong = async (song: ISongFormInput) => {
  const res = await instance.post("/song", song);
  return r(res);
};

const getSongById = async (id: string) => {
  const res = await instance.get(`/song/${id}`);
  return r(res);
};

const updateSong = async (song: ISongFormInput & { id: string }) => {
  const { id, ...songData } = song;
  const res = await instance.put(`/song/${id}`, songData);
  return r(res);
};

const deleteSong = async (id: string) => {
  const res = await instance.delete(`/song/${id}`);
  return r(res);
};

const mySongs = async (page: number, limit: number) => {
  const reqParams = new URLSearchParams();
  reqParams.append("page", page.toString());
  reqParams.append("limit", limit.toString());
  const url = `/song/my-songs?${reqParams.toString()}`;
  const res = await instance.post(url);
  // console.log(res.data)
  return r(res);
};

const searchSongs = async (req: SearchQuery) => {
  const reqParams = new URLSearchParams();
  reqParams.append("page", req.page.toString());
  reqParams.append("limit", req.limit.toString());

  if (req.query) {
    reqParams.append("q", req.query);
  }
  if (req.on) {
    reqParams.append("on", req.on);
  }
  if (req.sortBy) {
    reqParams.append("sort", req.sortBy);
  }
  if (req.asc) {
    reqParams.append("asc", req.asc);
  }
  if (req.uploadedBy) {
    reqParams.append("uploadedBy", req.uploadedBy);
  }
  const url = `/song/search?${reqParams.toString()}`;
  console.log(url);
  const res = await instance.post(url);
  return r(res);
};

const allSongs = async (page: number, limit: number) => {
  const reqParams = new URLSearchParams();
  reqParams.append("page", page.toString());
  reqParams.append("limit", limit.toString());
  const url = `/song?${reqParams.toString()}`;
  const res = await instance.get(url);
  return r(res);
};

const getSongStats = async (startDate: string, endDate: string) => {
  const reqBody = {
    startDate: startDate,
    endDate: endDate
  };
  console.log("Request body for song stats:", reqBody);
  const res = await instance.post("/song/stat", reqBody);
  return r(res);
};

export {
  createSong,
  updateSong,
  getSongById,
  deleteSong,
  searchSongs,
  mySongs,
  allSongs,
  getSongStats,
};
