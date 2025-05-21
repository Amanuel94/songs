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