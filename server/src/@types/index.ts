import { Schema } from "mongoose"

export interface Account {
  username: string
  password: string
  role: 'user' | 'admin'
}

export interface Song {
  title: string
  artist: string
  album: string | null
  genre: string
  uploadedBy: Schema.Types.ObjectId
}

export interface SongStat{
  numberOfSongs: number
  numberOfUsers: number
  numberOfSongsByGenre: {
    key: string
    count: number
  }[]
  numberOfSongsByArtist: {
    key: string
    count: number
  }[]
  numberOfSongsByAlbum: {
    key: string
    count: number
  }[]
  date: Date
} 
