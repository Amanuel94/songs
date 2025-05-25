export interface Account {
  username: string
  password: string
  role: 'user' | 'admin'
}

export interface FormData {
  username: Account['username']
  password: Account['password']
}

export interface cardProp {
  imgSrc: string
  caption: string
}

export interface IGenericFormInput {

}

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
  title: string | undefined;
  artist: string | undefined;
  album: string | undefined;
  genre: string | undefined;
}

export interface ISongFormInput extends IGenericFormInput{
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface SongData {
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