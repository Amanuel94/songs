import { AuthReq } from "@types";
import { client } from "./axios";
import type { AxiosResponse } from "axios";

const r = (res: AxiosResponse<any, any>) => {
  return { status: res.status, data: res.data};
};

export const registerUser = async (username: string, password: string) => {
  const body: AuthReq = {
    username,
    password,
  };
  const res = await client.post("/auth/register", body);
  return r(res);
};

export const loginUser = async (username: string, password: string) => {
  const body: AuthReq = {
    username,
    password,
  };
  const res = await client.post("/auth/login", body);
  return r(res);
};

export const logoutUser = async () => {
  const res = await client.post("/logout");
  return r(res);
};
