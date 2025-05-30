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
  uploadedBy: string;
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
}
export interface AuthResponse extends BaseResponse {
  data: {
    id: string;
    username: string;
  } | undefined;
  message: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
export interface AuthActionType extends BaseActionType {
  payload: {
    req: AuthReq;
  };
}


// export interface RegisterResponse extends BaseResponse {
//   data: {
//     id: string;
//     username: string;
//   };
//   accessToken: string;
//   refreshToken: string;
// }
