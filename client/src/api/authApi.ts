import { AuthReq } from "@types";
import { instance } from "./axios";
import { r } from "utils/utils";


export const registerUser = async (username: string, password: string) => {
  const body: AuthReq = {
    username,
    password,
  };
  const res = await instance.post("/auth/register", body);
  return r(res);
};

export const loginUser = async (username: string, password: string) => {
  const body: AuthReq = {
    username,
    password,
  };
  const res = await instance.post("/auth/login", body);
  return r(res);
};

export const logoutUser = async () => {
  const res = await instance.post("/logout");
  return r(res);
};
