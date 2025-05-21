import { type Document, model, Schema } from 'mongoose'
import { type Song } from '../@types'

interface ISong extends Document, Song {}

const instance = new Schema<ISong>(
  {
    title: {
      type: String,
      required: true,
      
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: false,
    },
    genre: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const modelName = 'Song'

export default model<ISong>(modelName, instance)
