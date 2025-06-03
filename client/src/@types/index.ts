import { UnknownAction } from "@reduxjs/toolkit";

export interface Account {
  username: string;
  password: string;
  role: "user" | "admin";
}

export interface FormData {
  username: Account["username"];
  password: Account["password"];
}

export interface cardProp {
  imgSrc: string;
  caption: string;
  link?: string;
}

export interface IGenericFormInput {}

export interface IFormInput extends IGenericFormInput {
  username: string;
  password: string;
}

export interface IRegistrationFormInput extends IFormInput {
  confirmPassword: string;
}

export interface InputFieldProp {
  label: string;
  type: string;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

export interface ISongFormProps {
  id: string | undefined;
  title: string | undefined;
  artist: string | undefined;
  album: string | undefined;
  genre: string | undefined;
  uploadedBy: string | undefined;
}

export interface ISongFormInput extends IGenericFormInput {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongData {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  uploadedBy:
    | string
    | {
        id: string;
        username: string;
      };
  createdAt?: string;
}

export interface SongStat {
  numberOfSongs: number;
  numberOfSongsByGenre: {
    key: string;
    count: number;
  }[];
  numberOfSongsByArtist: {
    key: string;
    count: number;
  }[];
  numberOfSongsByAlbum: {
    key: string;
    count: number;
  }[];
  numberOfAlbumsByArtist: {
    key: string;
    count: number;
  }[];
  numberOfAlbumsByGenre: {
    key: string;
    count: number;
  }[];
  date: Date;
}

export interface IRequestData {}

export interface AuthReq extends IRequestData {
  username: string;
  password: string;
}

export enum APIFetchStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export interface BaseActionType {
  type: string;
  payload?: any;
}

export interface BaseResponse {
  status: number;
  data: any;
}
export interface AuthResponse extends BaseResponse {
  data:
    | {
        id: string;
        username: string;
      }
    | undefined;
  message: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
export interface AuthActionType extends BaseActionType {
  payload: {
    req: AuthReq;
  };
}

export const SONG_API_ACTION_TYPE_STRINGS = {
  Create: "songApi/create",
  Update: "songApi/update",
  Delete: "songApi/delete",
  Fetch: "songApi/fetch",
  FetchAll: "songApi/all",
  FetchSearch: "songApi/fetchSearch",
  FetchMySongs: "songApi/fetchMySongs",
} as const;

export interface UpsertSongActionType extends UnknownAction {
  type:
    | typeof SONG_API_ACTION_TYPE_STRINGS.Update
    | typeof SONG_API_ACTION_TYPE_STRINGS.Create;
  payload: {
    req: ISongFormInput & { id?: string };
  };
}
export interface DeleteSongActionType extends UnknownAction {
  type: typeof SONG_API_ACTION_TYPE_STRINGS.Delete;
  payload: {
    req: {
      id: string;
    };
  };
}
export interface FetchSongActionType extends UnknownAction {
  type: typeof SONG_API_ACTION_TYPE_STRINGS.Fetch;
  payload: {
    id: string;
  };
}
export interface SearchQuery {
  query: string;
  page: number;
  limit: number;
  sortBy?: string;
  uploadedBy?: string;
  asc?: "t" | "f";
  on: string;
}
export interface FetchSongsActionType extends UnknownAction {
  type: typeof SONG_API_ACTION_TYPE_STRINGS.FetchAll;
  payload: {
    req: SearchQuery;
  };
}

export interface FetchMySongsActionType extends UnknownAction {
  type: typeof SONG_API_ACTION_TYPE_STRINGS.FetchMySongs;
  payload: {
    req: {
      page: number;
      limit: number;
    };
  };
}

export interface UpsertSongResponse extends BaseResponse {
  data: SongData | undefined;
  message: string | undefined;
}

export interface DeleteSongResponse extends BaseResponse {
  data: SongData | undefined;
  message: string | undefined;
}
export interface FetchSongResponse extends BaseResponse {
  data: SongData | undefined;
  message: string | undefined;
}
export interface FetchSongsResponse extends BaseResponse {
  data: {
    songs: SongData[];
  };
  total: number;
  message: string | undefined;
}

export interface FetchMySongsResponse extends BaseResponse {
  data: {
    songs: SongData[];
    pages: number;
  };
  total: number;
  message: string | undefined;
}

export interface FetchSearchResults extends BaseResponse {
  data: {
    songs: SongData[];
  };
  total: number;
  message: string | undefined;
}
